import router from "next/router";
let timeoutId;

export const debounce = (func, delay) => {
  return function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func();
    }, delay);
  };
};
export function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function toPrsianCurrency(number, locale = "fa-IR") {
  const integerNumber = +number;
  return Number(integerNumber.toFixed(1)).toLocaleString(locale);
}
export function toForeignLocale(number = 12, locale = "fa-IR") {
  return Number(number).toLocaleString(locale);
}
export const e2p = (s) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
export const p2e = (s) => s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
export function toShamsiDate(paramsDate, isTime) {
  let date = new Date(paramsDate).toLocaleDateString("fa-IR");
  let time = new Date(paramsDate).toLocaleTimeString("fa-IR");
  return paramsDate ? (isTime ? time + " " + date : date) : null;
}
export function toGregorianDate(date) {
  return date ? new Date(date).toLocaleDateString("en-Us") : null;
}
export function dublicateToCount(arr, filed) {
  const zipped = Array.from(
    arr
      ?.reduce((map, o) => {
        // check if id already registered
        if (map.has(o[filed])) {
          // increment count
          map.get(o[filed]).count++;
        } else {
          // otherwise, store the new object with count starting at 1
          map.set(o[filed], { ...o, count: 1 });
        }
        return map;
      }, new Map())
      .values()
  );

  return zipped;
}

export const toBase64 = (str) =>
  typeof window === "undefined" ? Buffer.from(str).toString("base64") : window.btoa(str);

export function uuid(params = "uniqId") {
  return `${params}_xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
export function isEmptyValue(val) {
  return val === undefined || val == null || val.length <= 0;
}
export function emptyObj(obj) {
  return Object.keys(obj).length === 0;
}
export function lengthObj(obj) {
  return Object.keys(obj).length;
}
export function emptyArray(array) {
  return array?.length === 0;
}

export function removeNullPeropertyInObject(conditinal, returnProperty) {
  return { ...(conditinal ? { returnProperty } : {}) };
}
export function removedEmptyobject(array) {
  const newArray = array.filter((element) => {
    if (Object.keys(element).length !== 0) {
      return true;
    }

    return false;
  });

  return newArray;
}

export function allAreTrue(arr) {
  return arr.every((element) => element === true);
}
export function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
    return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}
export function isNumeric(value) {
  return /^-?\d+$/.test(value);
}

export const removePropertyInObject = (obj, props = []) => {
  let res = Object.assign({}, obj);
  props?.forEach((prop) => {
    delete res[prop];
  });
  return res;
};
export const HandleTotalCountDynamicArray = (scoreboard) => {
  if (emptyArray(scoreboard)) {
    return [];
  } else {
    return scoreboard?.reduce(
      (prev, cur, i) =>
        i === 0 ? cur : Object.entries(cur).reduce((ac, [key, value]) => ({ ...ac, [key]: value + prev[key] }), {}),
      {}
    );
  }
};

export function csvToArray(str, delimiter = ",") {
  const stringCsv = typeof str === "string" ? str : "";
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  const headers = stringCsv.slice(0, stringCsv.indexOf("\n")).split(delimiter);

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  const rows = stringCsv.slice(stringCsv.indexOf("\n") + 1).split("\n");

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  // return the array
  return arr;
}

export function findThreeLargestNumbers(array) {
  return [...array].sort((a, b) => a - b).slice(-3);
}
if (typeof window !== "undefined" && !HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", {
    value: function (callback, type, quality) {
      var binStr = atob(this.toDataURL(type, quality).split(",")[1]),
        len = binStr.length,
        arr = new Uint8Array(len);
      for (var i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
      }
      callback(new Blob([arr], { type: type || "image/png" }));
    },
  });
}
export function ConvertObjectToMultipleQueryString(obj, notSeturl = false) {
  const listArrayName = Object.entries(obj).map(([name, obj]) => {
    if (obj instanceof Array) {
      return name;
    }
  });
  const removeItemInObj = removePropertyInObject(obj, listArrayName);

  const arrayQuery = Object.entries(obj).map(([name, obj]) => {
    if (obj instanceof Array) {
      return { name: name, value: obj };
    }
  });

  const removeNullableArrayQuery = arrayQuery.filter((item) => item !== undefined);

  const finalArrayQuery = removeNullableArrayQuery.map((item, index) => {
    return item.value.map((value, index) => {
      return {
        name: item.name,
        value: value,
      };
    });
  });
  const section2 = new URLSearchParams(finalArrayQuery[0]?.map((e) => (!!e.value ? [e.name, e.value] : "")));

  const queryParams =
    "?" +
    Object.keys(removeItemInObj)
      .map((key, i) => {
        var nullabel =
          removeItemInObj[key] === null ||
          removeItemInObj[key] === undefined ||
          removeItemInObj[key] === "null" ||
          removeItemInObj[key] === "undefined" ||
          removeItemInObj[key] === "";
        return !nullabel ? `${!nullabel ? "&" : ""}${key}=${encodeURIComponent(removeItemInObj[key])}` : "";
      })
      .join("");

  const QueryStringSeplaced =
    queryParams.substring(0, 1) + "" + queryParams.substring(1 + 1) + `${section2 ? "&" : ""}` + section2;

  return QueryStringSeplaced;
}
export function ConvertObjectToQueryString(obj) {
  const queryParams =
    "?" +
    Object.keys(obj)
      .map((key, i) => {
        var nullabel =
          obj[key] === null ||
          obj[key] === undefined ||
          obj[key] === "null" ||
          obj[key] === "undefined" ||
          obj[key] === "";
        return !nullabel ? `${!nullabel ? "&" : ""}${key}=${encodeURIComponent(obj[key])}` : "";
      })
      .join("");

  const QueryStringSeplaced = queryParams.substring(0, 1) + "" + queryParams.substring(1 + 1);

  return QueryStringSeplaced;
}

export function addToQueryWithMultipleString(obj, queryUrl) {
  const QueryWhitoutCurrentPage = removePropertyInObject(queryUrl, ["currentPage"]);

  const listArrayName = Object.entries(obj).map(([name, obj]) => {
    if (obj instanceof Array) {
      return name;
    }
  });
  const removeItemInObj = removePropertyInObject(obj, listArrayName);

  const arrayQuery = Object.entries(obj).map(([name, obj]) => {
    if (obj instanceof Array) {
      return { name: name, value: obj };
    }
  });

  const removeNullableArrayQuery = arrayQuery.filter((item) => item !== undefined);

  const finalArrayQuery = removeNullableArrayQuery.map((item, index) => {
    return item.value.map((value, index) => {
      return {
        name: item.name,
        value: value,
      };
    });
  });
  const section2 = new URLSearchParams(finalArrayQuery[0]?.map((e) => (!!e.value ? [e.name, e.value] : "")));

  const query = { ...QueryWhitoutCurrentPage, ...removeItemInObj };
  const queryParams =
    "?" +
    Object.keys(query)
      .map((key, i) => {
        var nullabel =
          query[key] === null ||
          query[key] === undefined ||
          query[key] === "null" ||
          query[key] === "undefined" ||
          query[key] === "";
        return !nullabel ? `${!nullabel ? "&" : ""}${key}=${encodeURIComponent(query[key])}` : "";
      })
      .join("");

  const QueryStringSeplaced = queryParams.substring(0, 1) + "" + queryParams.substring(1 + 1);
  const RemoveQuestionMark = QueryStringSeplaced.slice(1) + "&" + section2;
  router.push(
    {
      query: RemoveQuestionMark,
    },
    undefined,
    {
      shallow: true,
    }
  );
}

export function addToQueryString(obj, queryUrl) {
  const QueryWhitoutCurrentPage = removePropertyInObject(queryUrl, ["currentPage"]);
  const query = { ...QueryWhitoutCurrentPage, ...obj };
  const queryParams =
    "?" +
    Object.keys(query)
      .map((key, i) => {
        var nullabel =
          query[key] === null ||
          query[key] === undefined ||
          query[key] === "null" ||
          query[key] === "undefined" ||
          query[key] === "";
        return !nullabel ? `${!nullabel ? "&" : ""}${key}=${encodeURIComponent(query[key])}` : "";
      })
      .join("");

  const QueryStringSeplaced = queryParams.substring(0, 1) + "" + queryParams.substring(1 + 1);
  const RemoveQuestionMark = QueryStringSeplaced.slice(1);
  router.push(
    {
      query: RemoveQuestionMark,
    },
    undefined,
    {
      shallow: true,
    }
  );
}

export function ConvertQueryStringToObject(obj, notSeturl = false) {}
//*************  convert size image *********************/
// window.URL = window.URL || window.webkitURL;
// -2 = not jpeg, -1 = no data, 1..8 = orientations
function getExifOrientation(file, callback) {
  if (file.slice) {
    file = file.slice(0, 131072);
  } else if (file.webkitSlice) {
    file = file.webkitSlice(0, 131072);
  }
  var reader = new FileReader();
  reader.onload = function (e) {
    var view = new DataView(e.target.result);
    if (view.getUint16(0, false) != 0xffd8) {
      callback(-2);
      return;
    }
    var length = view.byteLength,
      offset = 2;
    while (offset < length) {
      var marker = view.getUint16(offset, false);
      offset += 2;
      if (marker == 0xffe1) {
        if (view.getUint32((offset += 2), false) != 0x45786966) {
          callback(-1);
          return;
        }
        var little = view.getUint16((offset += 6), false) == 0x4949;
        offset += view.getUint32(offset + 4, little);
        var tags = view.getUint16(offset, little);
        offset += 2;
        for (var i = 0; i < tags; i++)
          if (view.getUint16(offset + i * 12, little) == 0x0112) {
            callback(view.getUint16(offset + i * 12 + 8, little));
            return;
          }
      } else if ((marker & 0xff00) != 0xff00) break;
      else offset += view.getUint16(offset, false);
    }
    callback(-1);
  };
  reader.readAsArrayBuffer(file);
}
function imgToCanvasWithOrientation(img, rawWidth, rawHeight, orientation) {
  var canvas = document.createElement("canvas");
  if (orientation > 4) {
    canvas.width = rawHeight;
    canvas.height = rawWidth;
  } else {
    canvas.width = rawWidth;
    canvas.height = rawHeight;
  }
  if (orientation > 1) {
    // console.log("EXIF orientation = " + orientation + ", rotating picture");
  }
  var ctx = canvas.getContext("2d");
  switch (orientation) {
    case 2:
      ctx.transform(-1, 0, 0, 1, rawWidth, 0);
      break;
    case 3:
      ctx.transform(-1, 0, 0, -1, rawWidth, rawHeight);
      break;
    case 4:
      ctx.transform(1, 0, 0, -1, 0, rawHeight);
      break;
    case 5:
      ctx.transform(0, 1, 1, 0, 0, 0);
      break;
    case 6:
      ctx.transform(0, 1, -1, 0, rawHeight, 0);
      break;
    case 7:
      ctx.transform(0, -1, -1, 0, rawHeight, rawWidth);
      break;
    case 8:
      ctx.transform(0, -1, 1, 0, 0, rawWidth);
      break;
  }
  ctx.drawImage(img, 0, 0, rawWidth, rawHeight);
  return canvas;
}
export function reduceFileSize(file, acceptFileSize, maxWidth, maxHeight, quality, callback = () => {}) {
  if (file.size <= acceptFileSize) {
    callback(file);
    return;
  }
  var img = new Image();
  img.onerror = function () {
    URL.revokeObjectURL(this.src);
    callback(file);
  };
  img.onload = function () {
    URL.revokeObjectURL(this.src);
    getExifOrientation(file, function (orientation) {
      var w = img.width,
        h = img.height;
      var baseW = img.width,
        baseH = img.height;
      var scale = orientation > 4 ? Math.min(maxHeight / w, maxWidth / h, 1) : Math.min(maxWidth / w, maxHeight / h, 1);
      h = Math.round(h * scale);
      w = Math.round(w * scale);
      if (baseW <= w) {
        return callback(file);
      } else {
        var canvas = imgToCanvasWithOrientation(img, w, h, orientation);
        canvas.toBlob(
          function (blob) {
            // console.log("Resized image to " + w + "x" + h + ", " + (blob.size >> 10) + "kB");
            callback(blob);
          },
          "image/jpeg",
          quality
        );
      }
    });
  };
  return (img.src = URL.createObjectURL(file));
}
//*************  convert size image *********************/

//*************  depopulation *********************/
export function dataDePopulator(arrayList, ignoreArrayList) {
  ignoreArrayList.map((item) => {
    let removeItemIndex = arrayList.indexOf(item);
    arrayList.splice(removeItemIndex, 1);
  });
  // console.log(arrayList);
  return arrayList;
}
