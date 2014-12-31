/* jshint -W084 */
(function(cledit, rangy) {

	function SelectionMgr(editor) {
		var debounce = cledit.Utils.debounce;
		var contentElt = editor.$contentElt;
		var scrollElt = editor.$scrollElt;
		cledit.Utils.createEventHooks(this);

		var self = this;
		var lastSelectionStart = 0, lastSelectionEnd = 0;
		this.selectionStart = 0;
		this.selectionEnd = 0;
		this.cursorY = 0;
		this.adjustTop = 0;
		this.adjustBottom = 0;

		this.findOffsets = function(offsetList) {
			var result = [];
			if(!offsetList.length) {
				return result;
			}
			var offset = offsetList.shift();
			var walker = editor.$document.createTreeWalker(contentElt, 4, null, false);
			var text = '';
			var walkerOffset = 0;
			while(walker.nextNode()) {
				text = walker.currentNode.nodeValue || '';
				var newWalkerOffset = walkerOffset + text.length;
				while(newWalkerOffset > offset) {
					result.push({
						container: walker.currentNode,
						offsetInContainer: offset - walkerOffset,
						offset: offset
					});
					if(!offsetList.length) {
						return result;
					}
					offset = offsetList.shift();
				}
				walkerOffset = newWalkerOffset;
			}
			do {
				result.push({
					container: walker.currentNode,
					offsetInContainer: text.length,
					offset: offset
				});
				offset = offsetList.shift();
			}
			while(offset);
			return result;
		};

		this.createRange = function(start, end) {
			start = start < 0 ? 0 : start;
			end = end < 0 ? 0 : end;
			var range = editor.$document.createRange();
			var offsetList = [], startIndex, endIndex;
			if(!isNaN(start)) {
				offsetList.push(start);
				startIndex = offsetList.length - 1;
			}
			if(!isNaN(end)) {
				offsetList.push(end);
				endIndex = offsetList.length - 1;
			}
			offsetList = this.findOffsets(offsetList);
			var startOffset = isNaN(start) ? start : offsetList[startIndex];
			range.setStart(startOffset.container, startOffset.offsetInContainer);
			var endOffset = startOffset;
			if(end && end != start) {
				endOffset = isNaN(end) ? end : offsetList[endIndex];
			}
			range.setEnd(endOffset.container, endOffset.offsetInContainer);
			return range;
		};

		var adjustScroll;
		var debouncedUpdateCursorCoordinates = debounce((function() {
			var coordinates = this.getCoordinates(this.selectionEnd, this.selectionEndContainer, this.selectionEndOffset);
			if(this.cursorY !== coordinates.y) {
				this.cursorY = coordinates.y;
				this.$trigger('cursorCoordinatesChanged', coordinates.x, coordinates.y);
			}
			if(adjustScroll) {
				var adjustTop, adjustBottom;
				adjustTop = adjustBottom = scrollElt.offsetHeight / 2 * editor.options.cursorFocusRatio;
				adjustTop = this.adjustTop || adjustTop;
				adjustBottom = this.adjustBottom || adjustTop;
				if(adjustTop && adjustBottom) {
					var cursorMinY = scrollElt.scrollTop + adjustTop;
					var cursorMaxY = scrollElt.scrollTop + scrollElt.offsetHeight - adjustBottom;
					if(this.cursorY < cursorMinY) {
						scrollElt.scrollTop += this.cursorY - cursorMinY;
					}
					else if(this.cursorY > cursorMaxY) {
						scrollElt.scrollTop += this.cursorY - cursorMaxY;
					}
				}
			}
			adjustScroll = false;
		}).bind(this));

		this.updateCursorCoordinates = function(adjustScrollParam) {
			adjustScroll = adjustScroll || adjustScrollParam;
			debouncedUpdateCursorCoordinates();
		};

		var oldSelectionRange;
		function checkSelection(selectionRange) {
			if(!oldSelectionRange ||
				oldSelectionRange.startContainer !== selectionRange.startContainer ||
				oldSelectionRange.startOffset !== selectionRange.startOffset ||
				oldSelectionRange.endContainer !== selectionRange.endContainer ||
				oldSelectionRange.endOffset !== selectionRange.endOffset
			) {
				oldSelectionRange = selectionRange;
				self.$trigger('selectionChanged', self.selectionStart, self.selectionEnd, selectionRange);
			}
		}

		this.restoreSelection = function() {
			var min = Math.min(this.selectionStart, this.selectionEnd);
			var max = Math.max(this.selectionStart, this.selectionEnd);
			var selectionRange = this.createRange(min, max);
			var selection = rangy.getSelection(editor.$window);
			var isBackward = this.selectionStart > this.selectionEnd;
			selection.setSingleRange(selectionRange, isBackward);
			checkSelection(selectionRange);
			return selectionRange;
		};

		var saveLastSelection = debounce(function() {
			lastSelectionStart = self.selectionStart;
			lastSelectionEnd = self.selectionEnd;
		}, 50);

		function setSelection(start, end) {
			if(start === undefined) {
				start = self.selectionStart;
			}
			if(start < 0) {
				start = 0;
			}
			if(end === undefined) {
				end = this.selectionEnd;
			}
			if(end < 0) {
				end = 0;
			}
			self.selectionStart = start;
			self.selectionEnd = end;
			saveLastSelection();
		}

		this.setSelectionStartEnd = function(start, end) {
			setSelection(start, end);
			return this.restoreSelection();
		};

		this.saveSelectionState = (function() {
			function save() {
				var selectionStart = self.selectionStart;
				var selectionEnd = self.selectionEnd;
				var selection = rangy.getSelection(editor.$window);
				if(selection.rangeCount > 0) {
					var selectionRange = selection.getRangeAt(0);
					var node = selectionRange.startContainer;
					if((contentElt.compareDocumentPosition(node) & Node.DOCUMENT_POSITION_CONTAINED_BY) || contentElt === node) {
						var offset = selectionRange.startOffset;
						if(node.hasChildNodes() && offset > 0) {
							node = node.childNodes[offset - 1];
							offset = node.textContent.length;
						}
						var container = node;
						while(node != contentElt) {
							while(node = node.previousSibling) {
								if(node.textContent) {
									offset += node.textContent.length;
								}
							}
							node = container = container.parentNode;
						}

						if(selection.isBackwards()) {
							selectionStart = offset + (selectionRange + '').length;
							selectionEnd = offset;
						}
						else {
							selectionStart = offset;
							selectionEnd = offset + (selectionRange + '').length;
						}

						if(selectionStart === selectionEnd && selectionRange.startContainer.textContent == '\n' && selectionRange.startOffset == 1) {
							// In IE if end of line is selected, offset is wrong
							// Also, in Firefox cursor can be after the trailingLfNode
							selectionStart = --selectionEnd;
							self.setSelectionStartEnd(selectionStart, selectionEnd);
						}
						else {
							setSelection(selectionStart, selectionEnd);
							checkSelection(selectionRange);
						}
						editor.undoMgr.saveSelectionState();
					}
				}
			}

			var nextTickAdjustScroll = false;
			var debouncedSave = debounce(function() {
				save();
				self.updateCursorCoordinates(nextTickAdjustScroll);
				// In some cases we have to wait a little bit more to see the selection change (Cmd+A on Chrome/OSX)
				longerDebouncedSave();
			});
			var longerDebouncedSave = debounce(function() {
				save();
				if(lastSelectionStart === self.selectionStart && lastSelectionEnd === self.selectionEnd) {
					nextTickAdjustScroll = false;
				}
				self.updateCursorCoordinates(nextTickAdjustScroll);
				nextTickAdjustScroll = false;
			}, 10);

			return function(debounced, adjustScroll, forceAdjustScroll) {
				if(forceAdjustScroll) {
					lastSelectionStart = undefined;
					lastSelectionEnd = undefined;
				}
				if(debounced) {
					nextTickAdjustScroll = nextTickAdjustScroll || adjustScroll;
					return debouncedSave();
				}
				else {
					save();
				}
			};
		})();

		this.getSelectedText = function() {
			var min = Math.min(this.selectionStart, this.selectionEnd);
			var max = Math.max(this.selectionStart, this.selectionEnd);
			return editor.getContent().substring(min, max);
		};

		this.getCoordinates = function(inputOffset, container, offsetInContainer) {
			if(!container) {
				var offset = this.findOffsets([inputOffset])[0];
				container = offset.container;
				offsetInContainer = offset.offsetInContainer;
			}
			var containerElt = container;
			if(!containerElt.hasChildNodes()) {
				containerElt = container.parentNode;
			}
			var isInvisible = false;
			var index = editor.$allElements.indexOf(containerElt);
			while(containerElt.offsetHeight === 0 && index > 0) {
				isInvisible = true;
				containerElt = editor.$allElements[--index];
			}
			var x = 0;
			var y = 0;
			if(isInvisible || container.textContent == '\n') {
				y = containerElt.offsetTop + containerElt.offsetHeight / 2;
			}
			else {
				var selectedChar = editor.getContent()[inputOffset];
				var startOffset = {
					container: container,
					offsetInContainer: offsetInContainer,
					offset: inputOffset
				};
				var endOffset = {
					container: container,
					offsetInContainer: offsetInContainer,
					offset: inputOffset
				};
				if(inputOffset > 0 && (selectedChar === undefined || selectedChar == '\n')) {
					if(startOffset.offset === 0) {
						// Need to calculate offset-1
						startOffset = inputOffset - 1;
					}
					else {
						startOffset.offsetInContainer -= 1;
					}
				}
				else {
					if(endOffset.offset === container.textContent.length) {
						// Need to calculate offset+1
						endOffset = inputOffset + 1;
					}
					else {
						endOffset.offsetInContainer += 1;
					}
				}
				var selectionRange = this.createRange(startOffset, endOffset);
				var selectionRect = selectionRange.getBoundingClientRect();
				y = selectionRect.top + selectionRect.height / 2 - contentElt.getBoundingClientRect().top + contentElt.scrollTop;
			}
			return {
				x: x,
				y: y
			};
		};

		this.getClosestWordOffset = function(offset) {
			var offsetStart = 0;
			var offsetEnd = 0;
			var nextOffset = 0;
			editor.getContent().split(/\s/).some(function(word) {
				if(word) {
					offsetStart = nextOffset;
					offsetEnd = nextOffset + word.length;
					if(offsetEnd > offset) {
						return true;
					}
				}
				nextOffset += word.length + 1;
			});
			return {
				start: offsetStart,
				end: offsetEnd
			};
		};
	}

	cledit.SelectionMgr = SelectionMgr;

})(window.cledit, window.rangy);