
function HandsontableHelper(hsc, metaData) {
	
	var _hsc = hsc;
	var _hsData = [];
	var _metaData = metaData;
	var _curRow = undefined;
	var _preRow = undefined;
	
	if(isUndefined(_metaData.fixedColLeft))
		_metaData.fixedColLeft = 1;
	if(isUndefined(_metaData.readonlyBool))
		_metaData.readonlyBool = true;
	if(isUndefined(_metaData.sortBool))
		_metaData.sortBool = true;
	if(isUndefined(_metaData.chkAllColumnYn))
		_metaData.chkAllColumnYn = true;
	if(isUndefined(_metaData.heightVal))
		_metaData.heightVal = 510;
	
	if(isUndefined(_metaData.curPage))
		_metaData.curPage = 1;
	
	if(isUndefined(_metaData.perPage))
		_metaData.perPage = 20;
	
	this.getCurPage = function() {
		return _metaData.curPage;
	}
	
	this.getPerPage = function() {
		return _metaData.perPage;
	}
	
	this.setCurPage = function(curPage) {
		_metaData.curPage = curPage;
	}
	
	this.setPerPage = function(perPage) {
		_metaData.perPage = perPage;
	}
	
	this.getHsc = function() {
		return _hsc;
	}
	
	this.getHsData = function() {
		return _hsData;
	}
	
	this.getHsChgData = function() {
		return _hsData.chg;
	}
	
	this.getHsGridData = function() {
		return _hsData.grid;
	}
	
	this.getHsOrgData = function() {
		return _hsData.org;
	}
	
	this.getMetaData = function() {
		return _metaData;
	}
	
	this.getCurRow = function() {
		return _curRow;
	}
	
	this.getPreRow = function() {
		return _preRow;
	}
	
	this.applyReadOnlyBoolGrid = function(bool) {
		if(bool) {
			_hsc.handsontable({
				cells : function(row, col, prop) {
					var cellProperties = {};
					cellProperties.readOnly = true;
					cellProperties.renderer = customedRenderer;
					return cellProperties;
				}
			});
	        
		} else {
			_hsc.handsontable({
				cells : function(row, col, prop) {
					var cellProperties = {};
					for (var i = 0; i < _metaData.columns.length; i++) {
						if(prop == _metaData.columns[i].data) {
							cellProperties.readOnly = _metaData.columns[i].readOnly;
						}
					}
					cellProperties.renderer = customedRenderer;
					return cellProperties;
				}
			});
		}
	}
	
	this.selectCell = function(rowNo, columnNo) {
		_hsc.handsontable("selectCell", (parseInt(rowNo)), parseInt(columnNo));
	}
	
	this.setData = function(dataObj) {
		var hsi = _hsc.handsontable('getInstance');
		dataObj = (dataObj == undefined) ? [] : dataObj;
		addUid(dataObj);
		_hsData.chg = {}
		var orgDataObj = new Object();
		orgDataObj = JSON.parse(JSON.stringify(dataObj));
		_hsData.org = orgDataObj;
		_hsData.grid = dataObj;
		hsi.loadData(null);
		hsi.loadData(dataObj);
		hsi.render();
		
		setTimeout(function(){
			_hsc.handsontable({
				cells : function(row, col, prop) {
					var cellProperties = {};
					if(_metaData.readonlyBool == true) {
						cellProperties.readOnly = _metaData.readonlyBool;
					} else {
						
						if(_metaData.pkColumns != undefined && _metaData.pkColumns.length > 0) {
							
							for (var k = 0; k < _metaData.pkColumns.length; k++) {
								if (prop == _metaData.pkColumns[k] && _hsData.grid != undefined) {
									if(_hsData.grid[row] == undefined || _hsData.grid[row].ROW_STATUS == undefined 
											|| _hsData.grid[row].ROW_STATUS != 'I') {
										cellProperties.readOnly = true;
									} else {
										cellProperties.readOnly = _metaData.columns[col].readOnly;
									}
								}
							}
							
						} else {
							if(_metaData.columns[col].readOnly != undefined) {
								cellProperties.readOnly = _metaData.columns[col].readOnly;
							} else {
								cellProperties.readOnly = _metaData.readonlyBool;
							}
							
						}
						
					}
					cellProperties.renderer = customedRenderer;
					return cellProperties;
				}
			});
		}, 100);
		
	}
	
	this.addData = function(insertDO, chkAllBool) {
		
		if (isUndefined(insertDO)) insertDO = {};
		if (isUndefined(chkAllBool)) chkAllBool = false;

		var maxUid = Object.keys(_hsData.org).length;
		var curRow;
		var maxTempUid = undefined;
		var maxRow = undefined;

		for (var i = 0; i < Object.keys(_hsData.chg).length; i++) {
			curRow = Object.keys(_hsData.chg)[i];
			maxRow = curRow;
			if (0 <= _hsData.chg[curRow].uid) {
				if (maxTempUid == undefined) {
					maxTempUid = _hsData.chg[curRow].uid;
				} else if (maxTempUid < _hsData.chg[curRow].uid) {
					maxTempUid = _hsData.chg[curRow].uid;
				}
			}
		}

		var nextUid;
		if (maxTempUid == undefined) {
				nextUid = maxUid;
		} else {
			if(maxTempUid >= maxUid) {
				nextUid = maxTempUid + 1;
			} else {
				nextUid = maxUid;
			}
		}

		var nextRow;
		if (maxRow == undefined) {
			nextRow = 0;
		} else {
			nextRow = (maxRow * 1) + 1;
		}

		addDataObj(jQuery, insertDO, "uid", nextUid);
		addDataObj(jQuery, insertDO, "ROW_STATUS", "I");
		if (chkAllBool) addDataObj(jQuery, insertDO, "CHK", false);

		addDataObj(jQuery, _hsData.grid, Object.keys(_hsData.grid).length, insertDO);
		addDataObj(jQuery, _hsData.chg, nextRow, insertDO);
		
		var hsi = _hsc.handsontable('getInstance');
		hsi.render();
		
		return nextUid;
	}
	
	this.delChkedRow = function() {
		var chkRowData = undefined;
		var sameRow = undefined;
		var curRow = undefined;
		var cnt;
		
		for (var i = (_hsData.grid.length - 1); i >= 0; i--) {
			if (_hsData.grid[i].CHK == true) {
				chkRowData = _hsData.grid[i];
				
				if (Object.keys(_hsData.chg).length == 0) {
					addDataObj(jQuery, chkRowData, "ROW_STATUS", "D");
					addDataObj(jQuery, _hsData.chg, "0", chkRowData);
				} else {
					cnt = 0;
					for (var j = 0; j < Object.keys(_hsData.chg).length; j++) {
						curRow = Object.keys(_hsData.chg)[j];
						if (_hsData.chg[curRow].uid == chkRowData.uid) {
							cnt++;
							sameRow = curRow;
						}
					}
					
					var nextRow;
					if (curRow == undefined) {
						nextRow = 0;
					} else {
						nextRow = (curRow * 1) + 1;
					}
					
					if (cnt == 0) {
						addDataObj(jQuery, chkRowData, "ROW_STATUS", "D");
						addDataObj(jQuery, _hsData.chg, nextRow, chkRowData);

					} else {
						if (chkRowData.ROW_STATUS == "I") {
							delete _hsData.chg[sameRow];

						} else if (chkRowData.ROW_STATUS == "U") {
							chkRowData.ROW_STATUS = "D";
						}
					}
				}
				
				_hsc.handsontable('alter', 'remove_row', Number(i));
			}
		}
		
		return true;
	}
	
	this.delrow = function() {
		var hsi = _hsc.handsontable('getInstance');
		
		if(isUndefined(_curRow)) return false;    
		
		var selRow = _curRow;
		if(hsi.sortIndex != undefined &&
				hsi.sortIndex.length > 0) {
			if(hsi.sortIndex.length > selRow) {
				selRow = hsi.sortIndex[selRow][0];
			}
		}
		var curRowData = _hsData.grid[selRow];

		var sameRow = undefined;
		var curRow = undefined;
		var cnt;
		
		if (Object.keys(_hsData.chg).length == 0) {
			addDataObj(jQuery, curRowData, "ROW_STATUS", "D");
			addDataObj(jQuery, _hsData.chg, "0", curRowData);
		} else {
			cnt = 0;
			for (var i = 0; i < Object.keys(_hsData.chg).length; i++) {
				curRow = Object.keys(_hsData.chg)[i];
				if (_hsData.chg[curRow].uid == curRowData.uid) {
					cnt++;
					sameRow = curRow;
				}
			}

			var nextRow;
			if (curRow == undefined) {
				nextRow = 0;
			} else {
				nextRow = (curRow * 1) + 1;
			}

			if (cnt == 0) {
				addDataObj(jQuery, curRowData, "ROW_STATUS", "D");
				addDataObj(jQuery, _hsData.chg, nextRow, curRowData);

			} else {
				if (curRowData.ROW_STATUS == "I") {
					delete _hsData.chg[sameRow];

				} else if (curRowData.ROW_STATUS == "U") {
					curRowData.ROW_STATUS = "D";
				}
			}
		}

		_hsc.handsontable('alter', 'remove_row', Number(selRow));
		
		return true;
	}
	
	var modifyData = function(modifyRow) {
		var hsi = _hsc.handsontable('getInstance');
		
		var selRow = modifyRow;
		if(hsi.sortIndex != undefined &&
				hsi.sortIndex.length > 0) {
			if(hsi.sortIndex.length > selRow) {
				selRow = hsi.sortIndex[selRow][0];
			}
		}
		
		var curRowData = _hsData.grid[selRow];
		var cnt = 0;
		var curRow;
		if (Object.keys(_hsData.chg).length == 0) {
			addDataObj(jQuery, curRowData, "ROW_STATUS", "U");
			addDataObj(jQuery, _hsData.chg, "0", curRowData);
		} else {
			if(curRowData == undefined) return;
			cnt = 0;
			for (var i = 0; i < Object.keys(_hsData.chg).length; i++) {
				curRow = Object.keys(_hsData.chg)[i];
				if(_hsData.chg[curRow].uid == curRowData.uid) {
					cnt++;
				}
			}
			
			var nextRow;
			if(curRow == undefined) {
				nextRow = 0;
			} else {
				nextRow = (curRow * 1) + 1;
			}
			
			if (cnt == 0) {
				addDataObj(jQuery, curRowData, "ROW_STATUS", "U");
				addDataObj(jQuery, _hsData.chg, nextRow, curRowData);
			}
		}
	}
	
	this.otherDefaultEventSetting = function() {
		var hot = _hsc.handsontable();
		hot.handsontable('updateSettings', {
			onSelection			: function(){
				if(_curRow == undefined) {
					_curRow = arguments[0];
				} else {
					if(_curRow != arguments[0]) {
						_preRow = _curRow;
						_curRow = arguments[0];
					} else {
						_preRow = _curRow;
					}
				}
			},
			afterChange 		: function(changes, source) {
				if(arguments[0] != null && arguments[0][0] != undefined) {
					if(arguments[0][0][2] != arguments[0][0][3]) {
						if(arguments[0][0][1] != 'CHK') {
							modifyData(arguments[0][0][0]);
						}
					}
				}
			},
			afterLoadData		: function(){
				if(metaData.chkAllColumnYn) {
					if($('.' + metaData.chkALlClassNm)[0] != undefined) {
						if($('.' + metaData.chkALlClassNm)[0].checked == undefined)
							$('.' + metaData.chkALlClassNm)[0].checked = false;
					}
				}
			},
			afterRender			: function(){
				
			}
		});
		
		if(_metaData.chkAllColumnYn) {
			$('.' + _metaData.chkALlClassNm).on('click', function(event) {
				
				setTimeout(function(){
					
					var checkboxApply = function(bool, _metaData, _hsc, event) {
						var deferred = $.Deferred();
							for (var i = 0; i < Object.keys(_hsData.grid).length; i++) {
								_hsData.grid[i].CHK = bool;
								if(i == Object.keys(_hsData.grid).length - 1)
									deferred.resolve(bool, _metaData, _hsc, event);
							}
						return deferred.promise();
					};
					
					_metaData.chkAllBool = $('.' + _metaData.chkALlClassNm)[0].checked;
					var dataPromise = checkboxApply(_metaData.chkAllBool, _metaData, _hsc, event);
					dataPromise.done(function(bool, _metaData, _hsc, event){
							var hsi = _hsc.handsontable('getInstance');
							hsi.render();
							event.preventDefault();
					})
				}, 1);
			});
		}
		
	}
	
	this.setRowClickEvent = function(callback) {
		var hsi = _hsc.handsontable('getInstance');
		var mouseDownBool = false;
		hsi.addHook('afterOnCellMouseDown',	function(row, column, erow, ecolumn) {
			mouseDownBool = true;
		});

		hsi.addHook('afterSelectionEnd', function(row, column, erow, ecolumn) {
			if (mouseDownBool) {
				callback(hsi, row, column, erow, ecolumn);
				mouseDownBool = false;
			}
		});
		
	}
	
	this.setRowChangeEvent = function(callback) {
		var hsi = _hsc.handsontable('getInstance');

		hsi.addHook('afterSelectionEnd', function(row, column, erow, ecolumn) {
			if(_curRow != _preRow) {
				callback(hsi, row, column, erow, ecolumn);
			}
		});
		
	}
	
};

function customedRenderer(instance, td, row, col, prop, value, cellProperties) {
	var code, desc;
	if((cellProperties.type == 'dropdown' || cellProperties.type == 'autocomplete' 
		|| cellProperties.type == 'autocompleteCenter') && value != null) {
		instance.view.wt.wtDom.addClass(td, 'htDropdown');
		if(value.indexOf(':') == -1 && value.length >= 3) {
			var evalStr = "instance.getData()[row]." + arguments[4] + "= ''";
			eval(evalStr);
		}
		Handsontable.renderers.TextRenderer.apply(this, arguments);
		code = value.match(/.+(?=\:)/mg);
		if(code != null) {
			code = code.toString();
			desc = value.replace(code, "").replace(':', "").replace("'", "");
			td.textContent = desc;
		} else {
			td.textContent = '';
		}
		//autocomplete Center 정렬 추가 
		if(cellProperties.type == 'autocompleteCenter') {
			instance.view.wt.wtDom.addClass(td, 'htAutocompleteCenter');
		}
		
	} else {
		if(cellProperties.type == 'text') {
			Handsontable.renderers.TextRenderer.apply(this, arguments);
		} else if(cellProperties.type == 'textHyperLink') {
			instance.view.wt.wtDom.addClass(td, 'htTextHyperLink');
			Handsontable.renderers.TextRenderer.apply(this, arguments);
		} else if(cellProperties.type == 'htTextHyperLinkLeftAlign') {
			instance.view.wt.wtDom.addClass(td, 'htTextHyperLinkLeftAlign');
			Handsontable.renderers.TextRenderer.apply(this, arguments);
		} else if(cellProperties.type == 'textCenter') {
			instance.view.wt.wtDom.addClass(td, 'htTextCenter');
			Handsontable.renderers.TextRenderer.apply(this, arguments);
		} else if(cellProperties.type == 'date') {
			instance.view.wt.wtDom.addClass(td, 'htDate');
			Handsontable.renderers.AutocompleteRenderer.apply(this, arguments);
		} else if(cellProperties.type == 'numeric') {
			Handsontable.renderers.NumericRenderer.apply(this, arguments);
		} else if(cellProperties.type == 'checkbox') {
			instance.view.wt.wtDom.addClass(td, 'htCheckbox');
			arguments[5] = (arguments[5] == undefined) ? false : arguments[5];
			Handsontable.renderers.CheckboxRenderer.apply(this, arguments);
		} else if(cellProperties.type == 'autocomplete') {
			Handsontable.renderers.AutocompleteRenderer.apply(this, arguments);
		} else if(cellProperties.type == 'handsontable') {
			Handsontable.renderers.AutocompleteRenderer.apply(this, arguments);
		} else if(cellProperties.type == 'password') {
			Handsontable.renderers.PasswordRenderer.apply(this, arguments);
		} else if(cellProperties.type == 'dropdown') {
			Handsontable.renderers.AutocompleteRenderer.apply(this, arguments);
		} else if(cellProperties.type == 'vssNmRender') {
		   if(instance.getDataAtCell(row, 'PORT_SPMT_STTS') == 'Departed') {
			   instance.view.wt.wtDom.addClass(td, 'htTextHyperLink');
			   Handsontable.renderers.TextRenderer.apply(this, arguments);
		   } else {
			   Handsontable.renderers.TextRenderer.apply(this, arguments); 
		   }
		}
	}
	if(td.textContent != undefined) limitCharLength(td, cellProperties);
}

HandsontableHelper.prototype = {
	constructor: HandsontableHelper,
	init:function() {
		var hsc = this.getHsc();
		var metaData = this.getMetaData();
		
		var hot = hsc.handsontable();
		
		for (var i = 0; i < metaData.columns.length; i++) {
			if(metaData.columns[i].data == 'CHK') {
				metaData.chkAllColumnYn = true;
				metaData.chkALlClassNm = "cls_sa" + hsc.selector.replace('#', "");
				metaData.colHeaders[i] = "<input type='checkbox' class='" +  metaData.chkALlClassNm + "' />";
			} 
		}
		
		hot.handsontable('updateSettings', {
			colHeaders 			: metaData.colHeaders,
			columns 			: metaData.columns,
			colWidths 			: metaData.colWidths,
			columnSorting 		: metaData.sortBool,
			fillHandle 			: null,
			currentRowClassName : 'currentRow',
			currentColClassName : 'currentCol',
			stretchH 			: "all",
			height				: metaData.heightVal,
			multiSelect			: false,
			manualColumnResize	: true,
			fixedColumnsLeft	: metaData.fixedColLeft,
			cells				: function(row, col, prop){
				if(metaData.columns[col].renderer == undefined) {
					var cellProperties = {};
					cellProperties.renderer = customedRenderer;

					if(metaData.readonlyBool == true) {
						cellProperties.readOnly = metaData.readonlyBool;
					} else {
						if(metaData.columns[col].readOnly != undefined) {
							cellProperties.readOnly = metaData.columns[col].readOnly;
						} else {
							cellProperties.readOnly = metaData.readonlyBool;
						}
					}
					return cellProperties;
				}
			}
		});
		
		this.otherDefaultEventSetting();
		
	}

};

function measureText(pText, pFontSize, pStyle) {
    var lDiv = document.createElement('lDiv');

    document.body.appendChild(lDiv);

    if (pStyle != null) {
        lDiv.style = pStyle;
    }
    lDiv.style.fontSize = "" + pFontSize + "px";
    lDiv.style.position = "absolute";
    lDiv.style.left = -1000;
    lDiv.style.top = -1000;

    lDiv.innerHTML = pText;

    var lResult = {
        width: lDiv.clientWidth,
        height: lDiv.clientHeight
    };

    document.body.removeChild(lDiv);
    lDiv = null;

    return lResult;
}

function limitCharLength(td, cellProperties) {
	var displayVal = td.textContent;
	var charactorSize = measureText(displayVal, '11', {font: 'Arial'});

	var displayCharNo = Math.round((td.clientWidth / 1.5));
	if(displayVal != undefined) {
		if(charactorSize.width > displayCharNo) {
			if(cellProperties.type != 'password') {
				displayVal = getMaxTextByWidth(displayVal, '11', {font: 'Arial'}, displayCharNo) + '..';
			}
			td.textContent = displayVal;
		}
	}
}

function isUndefined(obj) {
	if(typeof(obj) == 'undefined') return true;
	return false;
};

function isEmpty(obj) {
	if(typeof(obj) == 'undefined' || (obj + "").trim().length == 0) return true;
	return false;
};

function addUid(dataObj) {
	if(dataObj != undefined) {
		for (var i = 0; i < dataObj.length; i++) {
			addDataObj(jQuery, dataObj[i], "uid", i);
		}
	}
}

function addDataObj(jQuery, dataObj, keyNm, keyVal) {
	eval("jQuery.extend(dataObj, {" + keyNm + " : keyVal})");
}

function RealTypeOf(v) {
	if (typeof (v) == "object") {
		if (v === null) return "null";
		if (v.constructor == (new Array).constructor) return "array";
		if (v.constructor == (new Date).constructor) return "date";
		if (v.constructor == (new RegExp).constructor) return "regex";
		return "object";
	}
	return typeof (v);
}

function FormatJSON(oData, sIndent) {
	if (arguments.length < 2) {
		var sIndent = "";
	}
	var sIndentStyle = "    ";
	var sDataType = RealTypeOf(oData);

	if (sDataType == "array") {
		if (oData.length == 0) { return "[]"; }
		var sHTML = "[";
	} else {
		var iCount = 0;
		$.each(oData, function() {
			iCount++;
			return;
		});
		if (iCount == 0) { return "{}"; }
		var sHTML = "{";
	}

	var iCount = 0;
	$.each(oData, function(sKey, vValue) {
		if (iCount > 0) {
			sHTML += ",";
		}
		if (sDataType == "array") {
			sHTML += ("\n" + sIndent + sIndentStyle);
		} else {
			sHTML += ("\n" + sIndent + sIndentStyle + "\"" + sKey + "\"" + ": ");
		}

		switch (RealTypeOf(vValue)) {
		case "array":
		case "object":
			sHTML += FormatJSON(vValue, (sIndent + sIndentStyle));
			break;
		case "boolean":
		case "number":
			sHTML += vValue.toString();
			break;
		case "null":
			sHTML += "null";
			break;
		case "string":
			sHTML += ("\"" + vValue + "\"");
			break;
		default:
			sHTML += ("TYPEOF: " + typeof (vValue));
		}

		iCount++;
	});

	if (sDataType == "array") {
		sHTML += ("\n" + sIndent + "]");
	} else {
		sHTML += ("\n" + sIndent + "}");
	}

	return sHTML;
}