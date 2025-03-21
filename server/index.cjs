"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
exports.__esModule = true;
var node_sdk_1 = require("@lark-base-open/node-sdk");
// 新建 BaseClient，填写需要操作的 appToken 和 personalBaseToken
var client = new node_sdk_1.BaseClient({
    appToken: 'xxx',
    personalBaseToken: 'xxx'
});
var TABLEID = 'xxx';
// 查找替换
function searchAndReplace(from, to) {
    var _a, e_1, _b, _c;
    var _d;
    return __awaiter(this, void 0, void 0, function () {
        var res, fields, textFieldNames, _e, _f, _g, data, records, newRecords, _i, records_1, record, _h, record_id, fields_1, entries, newFields, _j, entries_1, _k, key, value, newValue, e_1_1;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0: return [4 /*yield*/, client.base.appTableField.list({
                        params: {
                            page_size: 100
                        },
                        path: {
                            table_id: TABLEID
                        }
                    })];
                case 1:
                    res = _l.sent();
                    fields = ((_d = res === null || res === void 0 ? void 0 : res.data) === null || _d === void 0 ? void 0 : _d.items) || [];
                    textFieldNames = fields.filter(function (field) { return field.ui_type === 'Text'; }).map(function (field) { return field.field_name; });
                    _l.label = 2;
                case 2:
                    _l.trys.push([2, 11, 12, 17]);
                    _e = true;
                    return [4 /*yield*/, client.base.appTableRecord.listWithIterator({ params: { page_size: 50 }, path: { table_id: TABLEID } })];
                case 3:
                    _f = __asyncValues.apply(void 0, [_l.sent()]);
                    _l.label = 4;
                case 4: return [4 /*yield*/, _f.next()];
                case 5:
                    if (!(_g = _l.sent(), _a = _g.done, !_a)) return [3 /*break*/, 10];
                    _c = _g.value;
                    _e = false;
                    _l.label = 6;
                case 6:
                    _l.trys.push([6, , 8, 9]);
                    data = _c;
                    records = (data === null || data === void 0 ? void 0 : data.items) || [];
                    newRecords = [];
                    for (_i = 0, records_1 = records; _i < records_1.length; _i++) {
                        record = records_1[_i];
                        _h = record || {}, record_id = _h.record_id, fields_1 = _h.fields;
                        entries = Object.entries(fields_1);
                        newFields = {};
                        for (_j = 0, entries_1 = entries; _j < entries_1.length; _j++) {
                            _k = entries_1[_j], key = _k[0], value = _k[1];
                            // 替换多行文本字段值
                            if ((textFieldNames.includes(key)) && typeof value === 'string') {
                                newValue = value.replace(new RegExp(from, 'g'), to);
                                // 把需要替换的字段加入 newFields
                                newValue !== value && (newFields[key] = newValue);
                            }
                        }
                        // 需要替换的记录加入 newRecords
                        Object.keys(newFields).length && newRecords.push({
                            record_id: record_id,
                            fields: newFields
                        });
                    }
                    // 批量更新记录
                    return [4 /*yield*/, client.base.appTableRecord.batchUpdate({
                            path: {
                                table_id: TABLEID
                            },
                            data: {
                                records: newRecords
                            }
                        })];
                case 7:
                    // 批量更新记录
                    _l.sent();
                    return [3 /*break*/, 9];
                case 8:
                    _e = true;
                    return [7 /*endfinally*/];
                case 9: return [3 /*break*/, 4];
                case 10: return [3 /*break*/, 17];
                case 11:
                    e_1_1 = _l.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 17];
                case 12:
                    _l.trys.push([12, , 15, 16]);
                    if (!(!_e && !_a && (_b = _f["return"]))) return [3 /*break*/, 14];
                    return [4 /*yield*/, _b.call(_f)];
                case 13:
                    _l.sent();
                    _l.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 16: return [7 /*endfinally*/];
                case 17:
                    console.log('success');
                    return [2 /*return*/];
            }
        });
    });
}
searchAndReplace('abc', '23333333');
console.log('start');
