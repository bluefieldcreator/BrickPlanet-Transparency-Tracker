var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m2 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m2) {
    return;
  }
  const match = m2[2] || m2[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m3, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m2 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m2) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m2[1] || m2[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new File(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m3 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m3) {
        entryName = m3[2] || m3[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var import_node_fs, import_node_path, import_node_worker_threads, import_node_http, import_node_https, import_node_zlib, import_node_stream, import_node_util, import_node_url, import_net, s, S, f, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/@sveltejs/kit/dist/chunks/multipart-parser.js"() {
    init_shims();
    import_node_fs = __toModule(require("node:fs"));
    import_node_path = __toModule(require("node:path"));
    import_node_worker_threads = __toModule(require("node:worker_threads"));
    init_install_fetch();
    import_node_http = __toModule(require("node:http"));
    import_node_https = __toModule(require("node:https"));
    import_node_zlib = __toModule(require("node:zlib"));
    import_node_stream = __toModule(require("node:stream"));
    import_node_util = __toModule(require("node:util"));
    import_node_url = __toModule(require("node:url"));
    import_net = __toModule(require("net"));
    globalThis.DOMException || (() => {
      const port = new import_node_worker_threads.MessageChannel().port1;
      const ab = new ArrayBuffer(0);
      try {
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        return err.constructor;
      }
    })();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f = 1;
    F = {
      PART_BOUNDARY: f,
      LAST_BOUNDARY: f *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c) => c | 32;
    noop = () => {
    };
    MultipartParser = class {
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i2 = 0; i2 < boundary.length; i2++) {
          ui8a[i2] = boundary.charCodeAt(i2);
          this.boundaryChars[ui8a[i2]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      write(data) {
        let i2 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i2;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i2, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i2 = 0; i2 < length_; i2++) {
          c = data[i2];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c !== boundary[index + 2]) {
                index = -2;
              }
              if (c === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            case S.HEADER_FIELD:
              if (c === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c === HYPHEN) {
                break;
              }
              if (c === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            case S.HEADER_VALUE:
              if (c === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i2 += boundaryEnd;
                while (i2 < bufferLength && !(data[i2] in boundaryChars)) {
                  i2 += boundaryLength;
                }
                i2 -= boundaryEnd;
                c = data[i2];
              }
              if (index < boundary.length) {
                if (boundary[index] === c) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i2--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i2 = 1; i2 < meta.length; i2++) {
    if (meta[i2] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i2]}`;
      if (meta[i2].indexOf("charset=") === 0) {
        charset = meta[i2].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0;
      while (position !== part.size) {
        const chunk = part.slice(position, Math.min(part.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
function formDataToBlob(F2, B = Blob$1) {
  var b = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c = [], p = `--${b}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v, n) => typeof v == "string" ? c.push(p + e(n) + `"\r
\r
${v.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c.push(p + e(n) + `"; filename="${e(v.name, 1)}"\r
Content-Type: ${v.type || "application/octet-stream"}\r
\r
`, v, "\r\n"));
  c.push(`--${b}--`);
  return new B(c, { type: "multipart/form-data; boundary=" + b });
}
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  const { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (!(body instanceof import_node_stream2.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error2 = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error2);
        throw error2;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    const error_ = error2 instanceof FetchBaseError ? error2 : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index, array) => {
    if (index % 2 === 0) {
      result.push(array.slice(index, index + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = (0, import_net2.isIP)(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (/^(.+\.)*localhost$/.test(url.host)) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy = token;
    }
  }
  return policy;
}
async function fetch(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const { parsedURL, options: options2 } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dataUriToBuffer(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (parsedURL.protocol === "https:" ? import_node_https2.default : import_node_http2.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_node_stream2.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(parsedURL, options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error2) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error2.message}`, "system", error2));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error2) => {
      response.body.destroy(error2);
    });
    if (process.version < "v14") {
      request_.on("socket", (s3) => {
        let endedWithEventsCount;
        s3.prependListener("end", () => {
          endedWithEventsCount = s3._eventsCount;
        });
        s3.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s3._eventsCount && !hadError) {
            const error2 = new Error("Premature close");
            error2.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error2);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location2 = headers.get("Location");
        const locationURL = location2 === null ? null : new URL(location2, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              headers.set("Location", locationURL);
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_node_stream2.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve2(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), reject);
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_node_zlib2.default.Z_SYNC_FLUSH,
        finishFlush: import_node_zlib2.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createGunzip(zlibOptions), reject);
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_node_stream2.pipeline)(response_, new import_node_stream2.PassThrough(), reject);
        raw.once("data", (chunk) => {
          body = (chunk[0] & 15) === 8 ? (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createInflate(), reject) : (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createInflateRaw(), reject);
          response = new Response(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_node_stream2.pipeline)(body, import_node_zlib2.default.createBrotliDecompress(), reject);
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error2 = new Error("Premature close");
        error2.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error2);
      }
    };
    socket.prependListener("close", onSocketClose);
    request.on("abort", () => {
      socket.removeListener("close", onSocketClose);
    });
    socket.on("data", (buf) => {
      properLastChunkReceived = Buffer.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    });
  });
}
var import_node_http2, import_node_https2, import_node_zlib2, import_node_stream2, import_node_util2, import_node_url2, import_net2, commonjsGlobal, ponyfill_es2018, POOL_SIZE$1, POOL_SIZE, _Blob, Blob2, Blob$1, _File, File, t, i, h, r, m, f2, e, x, FormData, FetchBaseError, FetchError, NAME, isURLSearchParameters, isBlob, isAbortSignal, INTERNALS$2, Body, clone, getNonSpecFormDataBoundary, extractContentType, getTotalBytes, writeToStream, validateHeaderName, validateHeaderValue, Headers, redirectStatus, isRedirect, INTERNALS$1, Response, getSearch, ReferrerPolicy, DEFAULT_REFERRER_POLICY, INTERNALS, isRequest, Request, getNodeRequestOptions, AbortError, supportedSchemas;
var init_install_fetch = __esm({
  "node_modules/@sveltejs/kit/dist/install-fetch.js"() {
    init_shims();
    import_node_http2 = __toModule(require("node:http"));
    import_node_https2 = __toModule(require("node:https"));
    import_node_zlib2 = __toModule(require("node:zlib"));
    import_node_stream2 = __toModule(require("node:stream"));
    import_node_util2 = __toModule(require("node:util"));
    import_node_url2 = __toModule(require("node:url"));
    import_net2 = __toModule(require("net"));
    commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    ponyfill_es2018 = { exports: {} };
    (function(module2, exports) {
      (function(global2, factory) {
        factory(exports);
      })(commonjsGlobal, function(exports2) {
        const SymbolPolyfill = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol : (description) => `Symbol(${description})`;
        function noop4() {
          return void 0;
        }
        function getGlobals() {
          if (typeof self !== "undefined") {
            return self;
          } else if (typeof window !== "undefined") {
            return window;
          } else if (typeof commonjsGlobal !== "undefined") {
            return commonjsGlobal;
          }
          return void 0;
        }
        const globals = getGlobals();
        function typeIsObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        const rethrowAssertionErrorRejection = noop4;
        const originalPromise = Promise;
        const originalPromiseThen = Promise.prototype.then;
        const originalPromiseResolve = Promise.resolve.bind(originalPromise);
        const originalPromiseReject = Promise.reject.bind(originalPromise);
        function newPromise(executor) {
          return new originalPromise(executor);
        }
        function promiseResolvedWith(value) {
          return originalPromiseResolve(value);
        }
        function promiseRejectedWith(reason) {
          return originalPromiseReject(reason);
        }
        function PerformPromiseThen(promise, onFulfilled, onRejected) {
          return originalPromiseThen.call(promise, onFulfilled, onRejected);
        }
        function uponPromise(promise, onFulfilled, onRejected) {
          PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
        }
        function uponFulfillment(promise, onFulfilled) {
          uponPromise(promise, onFulfilled);
        }
        function uponRejection(promise, onRejected) {
          uponPromise(promise, void 0, onRejected);
        }
        function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
          return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
        }
        function setPromiseIsHandledToTrue(promise) {
          PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
        }
        const queueMicrotask = (() => {
          const globalQueueMicrotask = globals && globals.queueMicrotask;
          if (typeof globalQueueMicrotask === "function") {
            return globalQueueMicrotask;
          }
          const resolvedPromise = promiseResolvedWith(void 0);
          return (fn) => PerformPromiseThen(resolvedPromise, fn);
        })();
        function reflectCall(F2, V, args) {
          if (typeof F2 !== "function") {
            throw new TypeError("Argument is not a function");
          }
          return Function.prototype.apply.call(F2, V, args);
        }
        function promiseCall(F2, V, args) {
          try {
            return promiseResolvedWith(reflectCall(F2, V, args));
          } catch (value) {
            return promiseRejectedWith(value);
          }
        }
        const QUEUE_MAX_ARRAY_SIZE = 16384;
        class SimpleQueue {
          constructor() {
            this._cursor = 0;
            this._size = 0;
            this._front = {
              _elements: [],
              _next: void 0
            };
            this._back = this._front;
            this._cursor = 0;
            this._size = 0;
          }
          get length() {
            return this._size;
          }
          push(element) {
            const oldBack = this._back;
            let newBack = oldBack;
            if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
              newBack = {
                _elements: [],
                _next: void 0
              };
            }
            oldBack._elements.push(element);
            if (newBack !== oldBack) {
              this._back = newBack;
              oldBack._next = newBack;
            }
            ++this._size;
          }
          shift() {
            const oldFront = this._front;
            let newFront = oldFront;
            const oldCursor = this._cursor;
            let newCursor = oldCursor + 1;
            const elements = oldFront._elements;
            const element = elements[oldCursor];
            if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
              newFront = oldFront._next;
              newCursor = 0;
            }
            --this._size;
            this._cursor = newCursor;
            if (oldFront !== newFront) {
              this._front = newFront;
            }
            elements[oldCursor] = void 0;
            return element;
          }
          forEach(callback) {
            let i2 = this._cursor;
            let node = this._front;
            let elements = node._elements;
            while (i2 !== elements.length || node._next !== void 0) {
              if (i2 === elements.length) {
                node = node._next;
                elements = node._elements;
                i2 = 0;
                if (elements.length === 0) {
                  break;
                }
              }
              callback(elements[i2]);
              ++i2;
            }
          }
          peek() {
            const front = this._front;
            const cursor = this._cursor;
            return front._elements[cursor];
          }
        }
        function ReadableStreamReaderGenericInitialize(reader, stream) {
          reader._ownerReadableStream = stream;
          stream._reader = reader;
          if (stream._state === "readable") {
            defaultReaderClosedPromiseInitialize(reader);
          } else if (stream._state === "closed") {
            defaultReaderClosedPromiseInitializeAsResolved(reader);
          } else {
            defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
          }
        }
        function ReadableStreamReaderGenericCancel(reader, reason) {
          const stream = reader._ownerReadableStream;
          return ReadableStreamCancel(stream, reason);
        }
        function ReadableStreamReaderGenericRelease(reader) {
          if (reader._ownerReadableStream._state === "readable") {
            defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          } else {
            defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
          }
          reader._ownerReadableStream._reader = void 0;
          reader._ownerReadableStream = void 0;
        }
        function readerLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released reader");
        }
        function defaultReaderClosedPromiseInitialize(reader) {
          reader._closedPromise = newPromise((resolve2, reject) => {
            reader._closedPromise_resolve = resolve2;
            reader._closedPromise_reject = reject;
          });
        }
        function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseReject(reader, reason);
        }
        function defaultReaderClosedPromiseInitializeAsResolved(reader) {
          defaultReaderClosedPromiseInitialize(reader);
          defaultReaderClosedPromiseResolve(reader);
        }
        function defaultReaderClosedPromiseReject(reader, reason) {
          if (reader._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(reader._closedPromise);
          reader._closedPromise_reject(reason);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        function defaultReaderClosedPromiseResetToRejected(reader, reason) {
          defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
        }
        function defaultReaderClosedPromiseResolve(reader) {
          if (reader._closedPromise_resolve === void 0) {
            return;
          }
          reader._closedPromise_resolve(void 0);
          reader._closedPromise_resolve = void 0;
          reader._closedPromise_reject = void 0;
        }
        const AbortSteps = SymbolPolyfill("[[AbortSteps]]");
        const ErrorSteps = SymbolPolyfill("[[ErrorSteps]]");
        const CancelSteps = SymbolPolyfill("[[CancelSteps]]");
        const PullSteps = SymbolPolyfill("[[PullSteps]]");
        const NumberIsFinite = Number.isFinite || function(x2) {
          return typeof x2 === "number" && isFinite(x2);
        };
        const MathTrunc = Math.trunc || function(v) {
          return v < 0 ? Math.ceil(v) : Math.floor(v);
        };
        function isDictionary(x2) {
          return typeof x2 === "object" || typeof x2 === "function";
        }
        function assertDictionary(obj, context) {
          if (obj !== void 0 && !isDictionary(obj)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertFunction(x2, context) {
          if (typeof x2 !== "function") {
            throw new TypeError(`${context} is not a function.`);
          }
        }
        function isObject(x2) {
          return typeof x2 === "object" && x2 !== null || typeof x2 === "function";
        }
        function assertObject(x2, context) {
          if (!isObject(x2)) {
            throw new TypeError(`${context} is not an object.`);
          }
        }
        function assertRequiredArgument(x2, position, context) {
          if (x2 === void 0) {
            throw new TypeError(`Parameter ${position} is required in '${context}'.`);
          }
        }
        function assertRequiredField(x2, field, context) {
          if (x2 === void 0) {
            throw new TypeError(`${field} is required in '${context}'.`);
          }
        }
        function convertUnrestrictedDouble(value) {
          return Number(value);
        }
        function censorNegativeZero(x2) {
          return x2 === 0 ? 0 : x2;
        }
        function integerPart(x2) {
          return censorNegativeZero(MathTrunc(x2));
        }
        function convertUnsignedLongLongWithEnforceRange(value, context) {
          const lowerBound = 0;
          const upperBound = Number.MAX_SAFE_INTEGER;
          let x2 = Number(value);
          x2 = censorNegativeZero(x2);
          if (!NumberIsFinite(x2)) {
            throw new TypeError(`${context} is not a finite number`);
          }
          x2 = integerPart(x2);
          if (x2 < lowerBound || x2 > upperBound) {
            throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
          }
          if (!NumberIsFinite(x2) || x2 === 0) {
            return 0;
          }
          return x2;
        }
        function assertReadableStream(x2, context) {
          if (!IsReadableStream(x2)) {
            throw new TypeError(`${context} is not a ReadableStream.`);
          }
        }
        function AcquireReadableStreamDefaultReader(stream) {
          return new ReadableStreamDefaultReader(stream);
        }
        function ReadableStreamAddReadRequest(stream, readRequest) {
          stream._reader._readRequests.push(readRequest);
        }
        function ReadableStreamFulfillReadRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readRequest = reader._readRequests.shift();
          if (done) {
            readRequest._closeSteps();
          } else {
            readRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadRequests(stream) {
          return stream._reader._readRequests.length;
        }
        function ReadableStreamHasDefaultReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamDefaultReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamDefaultReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read() {
            if (!IsReadableStreamDefaultReader(this)) {
              return promiseRejectedWith(defaultReaderBrandCheckException("read"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: () => resolvePromise({ value: void 0, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamDefaultReaderRead(this, readRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamDefaultReader(this)) {
              throw defaultReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamDefaultReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultReader",
            configurable: true
          });
        }
        function IsReadableStreamDefaultReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultReader;
        }
        function ReadableStreamDefaultReaderRead(reader, readRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "closed") {
            readRequest._closeSteps();
          } else if (stream._state === "errored") {
            readRequest._errorSteps(stream._storedError);
          } else {
            stream._readableStreamController[PullSteps](readRequest);
          }
        }
        function defaultReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
        }
        const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
        }).prototype);
        class ReadableStreamAsyncIteratorImpl {
          constructor(reader, preventCancel) {
            this._ongoingPromise = void 0;
            this._isFinished = false;
            this._reader = reader;
            this._preventCancel = preventCancel;
          }
          next() {
            const nextSteps = () => this._nextSteps();
            this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
            return this._ongoingPromise;
          }
          return(value) {
            const returnSteps = () => this._returnSteps(value);
            return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
          }
          _nextSteps() {
            if (this._isFinished) {
              return Promise.resolve({ value: void 0, done: true });
            }
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("iterate"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readRequest = {
              _chunkSteps: (chunk) => {
                this._ongoingPromise = void 0;
                queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
              },
              _closeSteps: () => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                resolvePromise({ value: void 0, done: true });
              },
              _errorSteps: (reason) => {
                this._ongoingPromise = void 0;
                this._isFinished = true;
                ReadableStreamReaderGenericRelease(reader);
                rejectPromise(reason);
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promise;
          }
          _returnSteps(value) {
            if (this._isFinished) {
              return Promise.resolve({ value, done: true });
            }
            this._isFinished = true;
            const reader = this._reader;
            if (reader._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("finish iterating"));
            }
            if (!this._preventCancel) {
              const result = ReadableStreamReaderGenericCancel(reader, value);
              ReadableStreamReaderGenericRelease(reader);
              return transformPromiseWith(result, () => ({ value, done: true }));
            }
            ReadableStreamReaderGenericRelease(reader);
            return promiseResolvedWith({ value, done: true });
          }
        }
        const ReadableStreamAsyncIteratorPrototype = {
          next() {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
            }
            return this._asyncIteratorImpl.next();
          },
          return(value) {
            if (!IsReadableStreamAsyncIterator(this)) {
              return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
            }
            return this._asyncIteratorImpl.return(value);
          }
        };
        if (AsyncIteratorPrototype !== void 0) {
          Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
        }
        function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
          const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
          iterator._asyncIteratorImpl = impl;
          return iterator;
        }
        function IsReadableStreamAsyncIterator(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_asyncIteratorImpl")) {
            return false;
          }
          try {
            return x2._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
          } catch (_a) {
            return false;
          }
        }
        function streamAsyncIteratorBrandCheckException(name) {
          return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
        }
        const NumberIsNaN = Number.isNaN || function(x2) {
          return x2 !== x2;
        };
        function CreateArrayFromList(elements) {
          return elements.slice();
        }
        function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n) {
          new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n), destOffset);
        }
        function TransferArrayBuffer(O) {
          return O;
        }
        function IsDetachedBuffer(O) {
          return false;
        }
        function ArrayBufferSlice(buffer, begin, end) {
          if (buffer.slice) {
            return buffer.slice(begin, end);
          }
          const length = end - begin;
          const slice = new ArrayBuffer(length);
          CopyDataBlockBytes(slice, 0, buffer, begin, length);
          return slice;
        }
        function IsNonNegativeNumber(v) {
          if (typeof v !== "number") {
            return false;
          }
          if (NumberIsNaN(v)) {
            return false;
          }
          if (v < 0) {
            return false;
          }
          return true;
        }
        function CloneAsUint8Array(O) {
          const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
          return new Uint8Array(buffer);
        }
        function DequeueValue(container) {
          const pair = container._queue.shift();
          container._queueTotalSize -= pair.size;
          if (container._queueTotalSize < 0) {
            container._queueTotalSize = 0;
          }
          return pair.value;
        }
        function EnqueueValueWithSize(container, value, size) {
          if (!IsNonNegativeNumber(size) || size === Infinity) {
            throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
          }
          container._queue.push({ value, size });
          container._queueTotalSize += size;
        }
        function PeekQueueValue(container) {
          const pair = container._queue.peek();
          return pair.value;
        }
        function ResetQueue(container) {
          container._queue = new SimpleQueue();
          container._queueTotalSize = 0;
        }
        class ReadableStreamBYOBRequest {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get view() {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("view");
            }
            return this._view;
          }
          respond(bytesWritten) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respond");
            }
            assertRequiredArgument(bytesWritten, 1, "respond");
            bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(this._view.buffer))
              ;
            ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
          }
          respondWithNewView(view) {
            if (!IsReadableStreamBYOBRequest(this)) {
              throw byobRequestBrandCheckException("respondWithNewView");
            }
            assertRequiredArgument(view, 1, "respondWithNewView");
            if (!ArrayBuffer.isView(view)) {
              throw new TypeError("You can only respond with array buffer views");
            }
            if (this._associatedReadableByteStreamController === void 0) {
              throw new TypeError("This BYOB request has been invalidated");
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
          }
        }
        Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
          respond: { enumerable: true },
          respondWithNewView: { enumerable: true },
          view: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBRequest.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBRequest",
            configurable: true
          });
        }
        class ReadableByteStreamController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get byobRequest() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("byobRequest");
            }
            return ReadableByteStreamControllerGetBYOBRequest(this);
          }
          get desiredSize() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("desiredSize");
            }
            return ReadableByteStreamControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("close");
            }
            if (this._closeRequested) {
              throw new TypeError("The stream has already been closed; do not close it again!");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
            }
            ReadableByteStreamControllerClose(this);
          }
          enqueue(chunk) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("enqueue");
            }
            assertRequiredArgument(chunk, 1, "enqueue");
            if (!ArrayBuffer.isView(chunk)) {
              throw new TypeError("chunk must be an array buffer view");
            }
            if (chunk.byteLength === 0) {
              throw new TypeError("chunk must have non-zero byteLength");
            }
            if (chunk.buffer.byteLength === 0) {
              throw new TypeError(`chunk's buffer must have non-zero byteLength`);
            }
            if (this._closeRequested) {
              throw new TypeError("stream is closed or draining");
            }
            const state = this._controlledReadableByteStream._state;
            if (state !== "readable") {
              throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
            }
            ReadableByteStreamControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableByteStreamController(this)) {
              throw byteStreamControllerBrandCheckException("error");
            }
            ReadableByteStreamControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ReadableByteStreamControllerClearPendingPullIntos(this);
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableByteStreamControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableByteStream;
            if (this._queueTotalSize > 0) {
              const entry = this._queue.shift();
              this._queueTotalSize -= entry.byteLength;
              ReadableByteStreamControllerHandleQueueDrain(this);
              const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
              readRequest._chunkSteps(view);
              return;
            }
            const autoAllocateChunkSize = this._autoAllocateChunkSize;
            if (autoAllocateChunkSize !== void 0) {
              let buffer;
              try {
                buffer = new ArrayBuffer(autoAllocateChunkSize);
              } catch (bufferE) {
                readRequest._errorSteps(bufferE);
                return;
              }
              const pullIntoDescriptor = {
                buffer,
                bufferByteLength: autoAllocateChunkSize,
                byteOffset: 0,
                byteLength: autoAllocateChunkSize,
                bytesFilled: 0,
                elementSize: 1,
                viewConstructor: Uint8Array,
                readerType: "default"
              };
              this._pendingPullIntos.push(pullIntoDescriptor);
            }
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableByteStreamControllerCallPullIfNeeded(this);
          }
        }
        Object.defineProperties(ReadableByteStreamController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          byobRequest: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableByteStreamController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableByteStreamController",
            configurable: true
          });
        }
        function IsReadableByteStreamController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableByteStream")) {
            return false;
          }
          return x2 instanceof ReadableByteStreamController;
        }
        function IsReadableStreamBYOBRequest(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_associatedReadableByteStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBRequest;
        }
        function ReadableByteStreamControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableByteStreamControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableByteStreamControllerError(controller, e2);
          });
        }
        function ReadableByteStreamControllerClearPendingPullIntos(controller) {
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          controller._pendingPullIntos = new SimpleQueue();
        }
        function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
          let done = false;
          if (stream._state === "closed") {
            done = true;
          }
          const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
          if (pullIntoDescriptor.readerType === "default") {
            ReadableStreamFulfillReadRequest(stream, filledView, done);
          } else {
            ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
          }
        }
        function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
          const bytesFilled = pullIntoDescriptor.bytesFilled;
          const elementSize = pullIntoDescriptor.elementSize;
          return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
        }
        function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
          controller._queue.push({ buffer, byteOffset, byteLength });
          controller._queueTotalSize += byteLength;
        }
        function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
          const elementSize = pullIntoDescriptor.elementSize;
          const currentAlignedBytes = pullIntoDescriptor.bytesFilled - pullIntoDescriptor.bytesFilled % elementSize;
          const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
          const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
          const maxAlignedBytes = maxBytesFilled - maxBytesFilled % elementSize;
          let totalBytesToCopyRemaining = maxBytesToCopy;
          let ready = false;
          if (maxAlignedBytes > currentAlignedBytes) {
            totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
            ready = true;
          }
          const queue = controller._queue;
          while (totalBytesToCopyRemaining > 0) {
            const headOfQueue = queue.peek();
            const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
            const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
            if (headOfQueue.byteLength === bytesToCopy) {
              queue.shift();
            } else {
              headOfQueue.byteOffset += bytesToCopy;
              headOfQueue.byteLength -= bytesToCopy;
            }
            controller._queueTotalSize -= bytesToCopy;
            ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
            totalBytesToCopyRemaining -= bytesToCopy;
          }
          return ready;
        }
        function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size, pullIntoDescriptor) {
          pullIntoDescriptor.bytesFilled += size;
        }
        function ReadableByteStreamControllerHandleQueueDrain(controller) {
          if (controller._queueTotalSize === 0 && controller._closeRequested) {
            ReadableByteStreamControllerClearAlgorithms(controller);
            ReadableStreamClose(controller._controlledReadableByteStream);
          } else {
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
        }
        function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
          if (controller._byobRequest === null) {
            return;
          }
          controller._byobRequest._associatedReadableByteStreamController = void 0;
          controller._byobRequest._view = null;
          controller._byobRequest = null;
        }
        function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
          while (controller._pendingPullIntos.length > 0) {
            if (controller._queueTotalSize === 0) {
              return;
            }
            const pullIntoDescriptor = controller._pendingPullIntos.peek();
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerPullInto(controller, view, readIntoRequest) {
          const stream = controller._controlledReadableByteStream;
          let elementSize = 1;
          if (view.constructor !== DataView) {
            elementSize = view.constructor.BYTES_PER_ELEMENT;
          }
          const ctor = view.constructor;
          const buffer = TransferArrayBuffer(view.buffer);
          const pullIntoDescriptor = {
            buffer,
            bufferByteLength: buffer.byteLength,
            byteOffset: view.byteOffset,
            byteLength: view.byteLength,
            bytesFilled: 0,
            elementSize,
            viewConstructor: ctor,
            readerType: "byob"
          };
          if (controller._pendingPullIntos.length > 0) {
            controller._pendingPullIntos.push(pullIntoDescriptor);
            ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
            return;
          }
          if (stream._state === "closed") {
            const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
            readIntoRequest._closeSteps(emptyView);
            return;
          }
          if (controller._queueTotalSize > 0) {
            if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
              const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
              ReadableByteStreamControllerHandleQueueDrain(controller);
              readIntoRequest._chunkSteps(filledView);
              return;
            }
            if (controller._closeRequested) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              readIntoRequest._errorSteps(e2);
              return;
            }
          }
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
          const stream = controller._controlledReadableByteStream;
          if (ReadableStreamHasBYOBReader(stream)) {
            while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
              const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
              ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
            }
          }
        }
        function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
          if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.elementSize) {
            return;
          }
          ReadableByteStreamControllerShiftPendingPullInto(controller);
          const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
          if (remainderSize > 0) {
            const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
            const remainder = ArrayBufferSlice(pullIntoDescriptor.buffer, end - remainderSize, end);
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, remainder, 0, remainder.byteLength);
          }
          pullIntoDescriptor.bytesFilled -= remainderSize;
          ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        }
        function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            ReadableByteStreamControllerRespondInClosedState(controller);
          } else {
            ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerShiftPendingPullInto(controller) {
          const descriptor = controller._pendingPullIntos.shift();
          return descriptor;
        }
        function ReadableByteStreamControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return false;
          }
          if (controller._closeRequested) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableByteStreamControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
        }
        function ReadableByteStreamControllerClose(controller) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          if (controller._queueTotalSize > 0) {
            controller._closeRequested = true;
            return;
          }
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (firstPendingPullInto.bytesFilled > 0) {
              const e2 = new TypeError("Insufficient bytes to fill elements in the given buffer");
              ReadableByteStreamControllerError(controller, e2);
              throw e2;
            }
          }
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
        function ReadableByteStreamControllerEnqueue(controller, chunk) {
          const stream = controller._controlledReadableByteStream;
          if (controller._closeRequested || stream._state !== "readable") {
            return;
          }
          const buffer = chunk.buffer;
          const byteOffset = chunk.byteOffset;
          const byteLength = chunk.byteLength;
          const transferredBuffer = TransferArrayBuffer(buffer);
          if (controller._pendingPullIntos.length > 0) {
            const firstPendingPullInto = controller._pendingPullIntos.peek();
            if (IsDetachedBuffer(firstPendingPullInto.buffer))
              ;
            firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          if (ReadableStreamHasDefaultReader(stream)) {
            if (ReadableStreamGetNumReadRequests(stream) === 0) {
              ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            } else {
              if (controller._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerShiftPendingPullInto(controller);
              }
              const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
              ReadableStreamFulfillReadRequest(stream, transferredView, false);
            }
          } else if (ReadableStreamHasBYOBReader(stream)) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
            ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
          } else {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          }
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
        function ReadableByteStreamControllerError(controller, e2) {
          const stream = controller._controlledReadableByteStream;
          if (stream._state !== "readable") {
            return;
          }
          ReadableByteStreamControllerClearPendingPullIntos(controller);
          ResetQueue(controller);
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableByteStreamControllerGetBYOBRequest(controller) {
          if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
            const firstDescriptor = controller._pendingPullIntos.peek();
            const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
            const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
            SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
            controller._byobRequest = byobRequest;
          }
          return controller._byobRequest;
        }
        function ReadableByteStreamControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableByteStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableByteStreamControllerRespond(controller, bytesWritten) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (bytesWritten !== 0) {
              throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
            }
          } else {
            if (bytesWritten === 0) {
              throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
            }
            if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
              throw new RangeError("bytesWritten out of range");
            }
          }
          firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
          ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
        }
        function ReadableByteStreamControllerRespondWithNewView(controller, view) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const state = controller._controlledReadableByteStream._state;
          if (state === "closed") {
            if (view.byteLength !== 0) {
              throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
            }
          } else {
            if (view.byteLength === 0) {
              throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
            }
          }
          if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
            throw new RangeError("The region specified by view does not match byobRequest");
          }
          if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
            throw new RangeError("The buffer of view has different capacity than byobRequest");
          }
          if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
            throw new RangeError("The region specified by view is larger than byobRequest");
          }
          const viewByteLength = view.byteLength;
          firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
          ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
        }
        function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
          controller._controlledReadableByteStream = stream;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._byobRequest = null;
          controller._queue = controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._closeRequested = false;
          controller._started = false;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          controller._autoAllocateChunkSize = autoAllocateChunkSize;
          controller._pendingPullIntos = new SimpleQueue();
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableByteStreamControllerError(controller, r2);
          });
        }
        function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
          const controller = Object.create(ReadableByteStreamController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingByteSource.start !== void 0) {
            startAlgorithm = () => underlyingByteSource.start(controller);
          }
          if (underlyingByteSource.pull !== void 0) {
            pullAlgorithm = () => underlyingByteSource.pull(controller);
          }
          if (underlyingByteSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
          }
          const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
          if (autoAllocateChunkSize === 0) {
            throw new TypeError("autoAllocateChunkSize must be greater than 0");
          }
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
        }
        function SetUpReadableStreamBYOBRequest(request, controller, view) {
          request._associatedReadableByteStreamController = controller;
          request._view = view;
        }
        function byobRequestBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
        }
        function byteStreamControllerBrandCheckException(name) {
          return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
        }
        function AcquireReadableStreamBYOBReader(stream) {
          return new ReadableStreamBYOBReader(stream);
        }
        function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
          stream._reader._readIntoRequests.push(readIntoRequest);
        }
        function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
          const reader = stream._reader;
          const readIntoRequest = reader._readIntoRequests.shift();
          if (done) {
            readIntoRequest._closeSteps(chunk);
          } else {
            readIntoRequest._chunkSteps(chunk);
          }
        }
        function ReadableStreamGetNumReadIntoRequests(stream) {
          return stream._reader._readIntoRequests.length;
        }
        function ReadableStreamHasBYOBReader(stream) {
          const reader = stream._reader;
          if (reader === void 0) {
            return false;
          }
          if (!IsReadableStreamBYOBReader(reader)) {
            return false;
          }
          return true;
        }
        class ReadableStreamBYOBReader {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
            assertReadableStream(stream, "First parameter");
            if (IsReadableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive reading by another reader");
            }
            if (!IsReadableByteStreamController(stream._readableStreamController)) {
              throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
            }
            ReadableStreamReaderGenericInitialize(this, stream);
            this._readIntoRequests = new SimpleQueue();
          }
          get closed() {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          cancel(reason = void 0) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
            }
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("cancel"));
            }
            return ReadableStreamReaderGenericCancel(this, reason);
          }
          read(view) {
            if (!IsReadableStreamBYOBReader(this)) {
              return promiseRejectedWith(byobReaderBrandCheckException("read"));
            }
            if (!ArrayBuffer.isView(view)) {
              return promiseRejectedWith(new TypeError("view must be an array buffer view"));
            }
            if (view.byteLength === 0) {
              return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
            }
            if (view.buffer.byteLength === 0) {
              return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
            }
            if (IsDetachedBuffer(view.buffer))
              ;
            if (this._ownerReadableStream === void 0) {
              return promiseRejectedWith(readerLockException("read from"));
            }
            let resolvePromise;
            let rejectPromise;
            const promise = newPromise((resolve2, reject) => {
              resolvePromise = resolve2;
              rejectPromise = reject;
            });
            const readIntoRequest = {
              _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
              _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
              _errorSteps: (e2) => rejectPromise(e2)
            };
            ReadableStreamBYOBReaderRead(this, view, readIntoRequest);
            return promise;
          }
          releaseLock() {
            if (!IsReadableStreamBYOBReader(this)) {
              throw byobReaderBrandCheckException("releaseLock");
            }
            if (this._ownerReadableStream === void 0) {
              return;
            }
            if (this._readIntoRequests.length > 0) {
              throw new TypeError("Tried to release a reader lock when that reader has pending read() calls un-settled");
            }
            ReadableStreamReaderGenericRelease(this);
          }
        }
        Object.defineProperties(ReadableStreamBYOBReader.prototype, {
          cancel: { enumerable: true },
          read: { enumerable: true },
          releaseLock: { enumerable: true },
          closed: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamBYOBReader.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamBYOBReader",
            configurable: true
          });
        }
        function IsReadableStreamBYOBReader(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readIntoRequests")) {
            return false;
          }
          return x2 instanceof ReadableStreamBYOBReader;
        }
        function ReadableStreamBYOBReaderRead(reader, view, readIntoRequest) {
          const stream = reader._ownerReadableStream;
          stream._disturbed = true;
          if (stream._state === "errored") {
            readIntoRequest._errorSteps(stream._storedError);
          } else {
            ReadableByteStreamControllerPullInto(stream._readableStreamController, view, readIntoRequest);
          }
        }
        function byobReaderBrandCheckException(name) {
          return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
        }
        function ExtractHighWaterMark(strategy, defaultHWM) {
          const { highWaterMark } = strategy;
          if (highWaterMark === void 0) {
            return defaultHWM;
          }
          if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
            throw new RangeError("Invalid highWaterMark");
          }
          return highWaterMark;
        }
        function ExtractSizeAlgorithm(strategy) {
          const { size } = strategy;
          if (!size) {
            return () => 1;
          }
          return size;
        }
        function convertQueuingStrategy(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          const size = init2 === null || init2 === void 0 ? void 0 : init2.size;
          return {
            highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
            size: size === void 0 ? void 0 : convertQueuingStrategySize(size, `${context} has member 'size' that`)
          };
        }
        function convertQueuingStrategySize(fn, context) {
          assertFunction(fn, context);
          return (chunk) => convertUnrestrictedDouble(fn(chunk));
        }
        function convertUnderlyingSink(original, context) {
          assertDictionary(original, context);
          const abort = original === null || original === void 0 ? void 0 : original.abort;
          const close = original === null || original === void 0 ? void 0 : original.close;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          const write = original === null || original === void 0 ? void 0 : original.write;
          return {
            abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
            close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
            write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
            type
          };
        }
        function convertUnderlyingSinkAbortCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSinkCloseCallback(fn, original, context) {
          assertFunction(fn, context);
          return () => promiseCall(fn, original, []);
        }
        function convertUnderlyingSinkStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertUnderlyingSinkWriteCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        function assertWritableStream(x2, context) {
          if (!IsWritableStream(x2)) {
            throw new TypeError(`${context} is not a WritableStream.`);
          }
        }
        function isAbortSignal2(value) {
          if (typeof value !== "object" || value === null) {
            return false;
          }
          try {
            return typeof value.aborted === "boolean";
          } catch (_a) {
            return false;
          }
        }
        const supportsAbortController = typeof AbortController === "function";
        function createAbortController() {
          if (supportsAbortController) {
            return new AbortController();
          }
          return void 0;
        }
        class WritableStream {
          constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
            if (rawUnderlyingSink === void 0) {
              rawUnderlyingSink = null;
            } else {
              assertObject(rawUnderlyingSink, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
            InitializeWritableStream(this);
            const type = underlyingSink.type;
            if (type !== void 0) {
              throw new RangeError("Invalid type is specified");
            }
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
          }
          get locked() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("locked");
            }
            return IsWritableStreamLocked(this);
          }
          abort(reason = void 0) {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("abort"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
            }
            return WritableStreamAbort(this, reason);
          }
          close() {
            if (!IsWritableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$2("close"));
            }
            if (IsWritableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
            }
            if (WritableStreamCloseQueuedOrInFlight(this)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamClose(this);
          }
          getWriter() {
            if (!IsWritableStream(this)) {
              throw streamBrandCheckException$2("getWriter");
            }
            return AcquireWritableStreamDefaultWriter(this);
          }
        }
        Object.defineProperties(WritableStream.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          getWriter: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStream.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStream",
            configurable: true
          });
        }
        function AcquireWritableStreamDefaultWriter(stream) {
          return new WritableStreamDefaultWriter(stream);
        }
        function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(WritableStream.prototype);
          InitializeWritableStream(stream);
          const controller = Object.create(WritableStreamDefaultController.prototype);
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function InitializeWritableStream(stream) {
          stream._state = "writable";
          stream._storedError = void 0;
          stream._writer = void 0;
          stream._writableStreamController = void 0;
          stream._writeRequests = new SimpleQueue();
          stream._inFlightWriteRequest = void 0;
          stream._closeRequest = void 0;
          stream._inFlightCloseRequest = void 0;
          stream._pendingAbortRequest = void 0;
          stream._backpressure = false;
        }
        function IsWritableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_writableStreamController")) {
            return false;
          }
          return x2 instanceof WritableStream;
        }
        function IsWritableStreamLocked(stream) {
          if (stream._writer === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamAbort(stream, reason) {
          var _a;
          if (stream._state === "closed" || stream._state === "errored") {
            return promiseResolvedWith(void 0);
          }
          stream._writableStreamController._abortReason = reason;
          (_a = stream._writableStreamController._abortController) === null || _a === void 0 ? void 0 : _a.abort();
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseResolvedWith(void 0);
          }
          if (stream._pendingAbortRequest !== void 0) {
            return stream._pendingAbortRequest._promise;
          }
          let wasAlreadyErroring = false;
          if (state === "erroring") {
            wasAlreadyErroring = true;
            reason = void 0;
          }
          const promise = newPromise((resolve2, reject) => {
            stream._pendingAbortRequest = {
              _promise: void 0,
              _resolve: resolve2,
              _reject: reject,
              _reason: reason,
              _wasAlreadyErroring: wasAlreadyErroring
            };
          });
          stream._pendingAbortRequest._promise = promise;
          if (!wasAlreadyErroring) {
            WritableStreamStartErroring(stream, reason);
          }
          return promise;
        }
        function WritableStreamClose(stream) {
          const state = stream._state;
          if (state === "closed" || state === "errored") {
            return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
          }
          const promise = newPromise((resolve2, reject) => {
            const closeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._closeRequest = closeRequest;
          });
          const writer = stream._writer;
          if (writer !== void 0 && stream._backpressure && state === "writable") {
            defaultWriterReadyPromiseResolve(writer);
          }
          WritableStreamDefaultControllerClose(stream._writableStreamController);
          return promise;
        }
        function WritableStreamAddWriteRequest(stream) {
          const promise = newPromise((resolve2, reject) => {
            const writeRequest = {
              _resolve: resolve2,
              _reject: reject
            };
            stream._writeRequests.push(writeRequest);
          });
          return promise;
        }
        function WritableStreamDealWithRejection(stream, error2) {
          const state = stream._state;
          if (state === "writable") {
            WritableStreamStartErroring(stream, error2);
            return;
          }
          WritableStreamFinishErroring(stream);
        }
        function WritableStreamStartErroring(stream, reason) {
          const controller = stream._writableStreamController;
          stream._state = "erroring";
          stream._storedError = reason;
          const writer = stream._writer;
          if (writer !== void 0) {
            WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
          }
          if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
            WritableStreamFinishErroring(stream);
          }
        }
        function WritableStreamFinishErroring(stream) {
          stream._state = "errored";
          stream._writableStreamController[ErrorSteps]();
          const storedError = stream._storedError;
          stream._writeRequests.forEach((writeRequest) => {
            writeRequest._reject(storedError);
          });
          stream._writeRequests = new SimpleQueue();
          if (stream._pendingAbortRequest === void 0) {
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const abortRequest = stream._pendingAbortRequest;
          stream._pendingAbortRequest = void 0;
          if (abortRequest._wasAlreadyErroring) {
            abortRequest._reject(storedError);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
            return;
          }
          const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
          uponPromise(promise, () => {
            abortRequest._resolve();
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          }, (reason) => {
            abortRequest._reject(reason);
            WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          });
        }
        function WritableStreamFinishInFlightWrite(stream) {
          stream._inFlightWriteRequest._resolve(void 0);
          stream._inFlightWriteRequest = void 0;
        }
        function WritableStreamFinishInFlightWriteWithError(stream, error2) {
          stream._inFlightWriteRequest._reject(error2);
          stream._inFlightWriteRequest = void 0;
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamFinishInFlightClose(stream) {
          stream._inFlightCloseRequest._resolve(void 0);
          stream._inFlightCloseRequest = void 0;
          const state = stream._state;
          if (state === "erroring") {
            stream._storedError = void 0;
            if (stream._pendingAbortRequest !== void 0) {
              stream._pendingAbortRequest._resolve();
              stream._pendingAbortRequest = void 0;
            }
          }
          stream._state = "closed";
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseResolve(writer);
          }
        }
        function WritableStreamFinishInFlightCloseWithError(stream, error2) {
          stream._inFlightCloseRequest._reject(error2);
          stream._inFlightCloseRequest = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._reject(error2);
            stream._pendingAbortRequest = void 0;
          }
          WritableStreamDealWithRejection(stream, error2);
        }
        function WritableStreamCloseQueuedOrInFlight(stream) {
          if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamHasOperationMarkedInFlight(stream) {
          if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
            return false;
          }
          return true;
        }
        function WritableStreamMarkCloseRequestInFlight(stream) {
          stream._inFlightCloseRequest = stream._closeRequest;
          stream._closeRequest = void 0;
        }
        function WritableStreamMarkFirstWriteRequestInFlight(stream) {
          stream._inFlightWriteRequest = stream._writeRequests.shift();
        }
        function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
          if (stream._closeRequest !== void 0) {
            stream._closeRequest._reject(stream._storedError);
            stream._closeRequest = void 0;
          }
          const writer = stream._writer;
          if (writer !== void 0) {
            defaultWriterClosedPromiseReject(writer, stream._storedError);
          }
        }
        function WritableStreamUpdateBackpressure(stream, backpressure) {
          const writer = stream._writer;
          if (writer !== void 0 && backpressure !== stream._backpressure) {
            if (backpressure) {
              defaultWriterReadyPromiseReset(writer);
            } else {
              defaultWriterReadyPromiseResolve(writer);
            }
          }
          stream._backpressure = backpressure;
        }
        class WritableStreamDefaultWriter {
          constructor(stream) {
            assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
            assertWritableStream(stream, "First parameter");
            if (IsWritableStreamLocked(stream)) {
              throw new TypeError("This stream has already been locked for exclusive writing by another writer");
            }
            this._ownerWritableStream = stream;
            stream._writer = this;
            const state = stream._state;
            if (state === "writable") {
              if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
                defaultWriterReadyPromiseInitialize(this);
              } else {
                defaultWriterReadyPromiseInitializeAsResolved(this);
              }
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "erroring") {
              defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
              defaultWriterClosedPromiseInitialize(this);
            } else if (state === "closed") {
              defaultWriterReadyPromiseInitializeAsResolved(this);
              defaultWriterClosedPromiseInitializeAsResolved(this);
            } else {
              const storedError = stream._storedError;
              defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
              defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
            }
          }
          get closed() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
            }
            return this._closedPromise;
          }
          get desiredSize() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("desiredSize");
            }
            if (this._ownerWritableStream === void 0) {
              throw defaultWriterLockException("desiredSize");
            }
            return WritableStreamDefaultWriterGetDesiredSize(this);
          }
          get ready() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
            }
            return this._readyPromise;
          }
          abort(reason = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("abort"));
            }
            return WritableStreamDefaultWriterAbort(this, reason);
          }
          close() {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("close"));
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("close"));
            }
            if (WritableStreamCloseQueuedOrInFlight(stream)) {
              return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
            }
            return WritableStreamDefaultWriterClose(this);
          }
          releaseLock() {
            if (!IsWritableStreamDefaultWriter(this)) {
              throw defaultWriterBrandCheckException("releaseLock");
            }
            const stream = this._ownerWritableStream;
            if (stream === void 0) {
              return;
            }
            WritableStreamDefaultWriterRelease(this);
          }
          write(chunk = void 0) {
            if (!IsWritableStreamDefaultWriter(this)) {
              return promiseRejectedWith(defaultWriterBrandCheckException("write"));
            }
            if (this._ownerWritableStream === void 0) {
              return promiseRejectedWith(defaultWriterLockException("write to"));
            }
            return WritableStreamDefaultWriterWrite(this, chunk);
          }
        }
        Object.defineProperties(WritableStreamDefaultWriter.prototype, {
          abort: { enumerable: true },
          close: { enumerable: true },
          releaseLock: { enumerable: true },
          write: { enumerable: true },
          closed: { enumerable: true },
          desiredSize: { enumerable: true },
          ready: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultWriter.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultWriter",
            configurable: true
          });
        }
        function IsWritableStreamDefaultWriter(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_ownerWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultWriter;
        }
        function WritableStreamDefaultWriterAbort(writer, reason) {
          const stream = writer._ownerWritableStream;
          return WritableStreamAbort(stream, reason);
        }
        function WritableStreamDefaultWriterClose(writer) {
          const stream = writer._ownerWritableStream;
          return WritableStreamClose(stream);
        }
        function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          return WritableStreamDefaultWriterClose(writer);
        }
        function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error2) {
          if (writer._closedPromiseState === "pending") {
            defaultWriterClosedPromiseReject(writer, error2);
          } else {
            defaultWriterClosedPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error2) {
          if (writer._readyPromiseState === "pending") {
            defaultWriterReadyPromiseReject(writer, error2);
          } else {
            defaultWriterReadyPromiseResetToRejected(writer, error2);
          }
        }
        function WritableStreamDefaultWriterGetDesiredSize(writer) {
          const stream = writer._ownerWritableStream;
          const state = stream._state;
          if (state === "errored" || state === "erroring") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
        }
        function WritableStreamDefaultWriterRelease(writer) {
          const stream = writer._ownerWritableStream;
          const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
          WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
          stream._writer = void 0;
          writer._ownerWritableStream = void 0;
        }
        function WritableStreamDefaultWriterWrite(writer, chunk) {
          const stream = writer._ownerWritableStream;
          const controller = stream._writableStreamController;
          const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
          if (stream !== writer._ownerWritableStream) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          const state = stream._state;
          if (state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
            return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
          }
          if (state === "erroring") {
            return promiseRejectedWith(stream._storedError);
          }
          const promise = WritableStreamAddWriteRequest(stream);
          WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
          return promise;
        }
        const closeSentinel = {};
        class WritableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get abortReason() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("abortReason");
            }
            return this._abortReason;
          }
          get signal() {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("signal");
            }
            if (this._abortController === void 0) {
              throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
            }
            return this._abortController.signal;
          }
          error(e2 = void 0) {
            if (!IsWritableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$2("error");
            }
            const state = this._controlledWritableStream._state;
            if (state !== "writable") {
              return;
            }
            WritableStreamDefaultControllerError(this, e2);
          }
          [AbortSteps](reason) {
            const result = this._abortAlgorithm(reason);
            WritableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [ErrorSteps]() {
            ResetQueue(this);
          }
        }
        Object.defineProperties(WritableStreamDefaultController.prototype, {
          abortReason: { enumerable: true },
          signal: { enumerable: true },
          error: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(WritableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "WritableStreamDefaultController",
            configurable: true
          });
        }
        function IsWritableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledWritableStream")) {
            return false;
          }
          return x2 instanceof WritableStreamDefaultController;
        }
        function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledWritableStream = stream;
          stream._writableStreamController = controller;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._abortReason = void 0;
          controller._abortController = createAbortController();
          controller._started = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._writeAlgorithm = writeAlgorithm;
          controller._closeAlgorithm = closeAlgorithm;
          controller._abortAlgorithm = abortAlgorithm;
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
          const startResult = startAlgorithm();
          const startPromise = promiseResolvedWith(startResult);
          uponPromise(startPromise, () => {
            controller._started = true;
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (r2) => {
            controller._started = true;
            WritableStreamDealWithRejection(stream, r2);
          });
        }
        function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(WritableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let writeAlgorithm = () => promiseResolvedWith(void 0);
          let closeAlgorithm = () => promiseResolvedWith(void 0);
          let abortAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSink.start !== void 0) {
            startAlgorithm = () => underlyingSink.start(controller);
          }
          if (underlyingSink.write !== void 0) {
            writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
          }
          if (underlyingSink.close !== void 0) {
            closeAlgorithm = () => underlyingSink.close();
          }
          if (underlyingSink.abort !== void 0) {
            abortAlgorithm = (reason) => underlyingSink.abort(reason);
          }
          SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function WritableStreamDefaultControllerClearAlgorithms(controller) {
          controller._writeAlgorithm = void 0;
          controller._closeAlgorithm = void 0;
          controller._abortAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function WritableStreamDefaultControllerClose(controller) {
          EnqueueValueWithSize(controller, closeSentinel, 0);
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
          try {
            return controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
            return 1;
          }
        }
        function WritableStreamDefaultControllerGetDesiredSize(controller) {
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
            return;
          }
          const stream = controller._controlledWritableStream;
          if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
        }
        function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
          const stream = controller._controlledWritableStream;
          if (!controller._started) {
            return;
          }
          if (stream._inFlightWriteRequest !== void 0) {
            return;
          }
          const state = stream._state;
          if (state === "erroring") {
            WritableStreamFinishErroring(stream);
            return;
          }
          if (controller._queue.length === 0) {
            return;
          }
          const value = PeekQueueValue(controller);
          if (value === closeSentinel) {
            WritableStreamDefaultControllerProcessClose(controller);
          } else {
            WritableStreamDefaultControllerProcessWrite(controller, value);
          }
        }
        function WritableStreamDefaultControllerErrorIfNeeded(controller, error2) {
          if (controller._controlledWritableStream._state === "writable") {
            WritableStreamDefaultControllerError(controller, error2);
          }
        }
        function WritableStreamDefaultControllerProcessClose(controller) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkCloseRequestInFlight(stream);
          DequeueValue(controller);
          const sinkClosePromise = controller._closeAlgorithm();
          WritableStreamDefaultControllerClearAlgorithms(controller);
          uponPromise(sinkClosePromise, () => {
            WritableStreamFinishInFlightClose(stream);
          }, (reason) => {
            WritableStreamFinishInFlightCloseWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
          const stream = controller._controlledWritableStream;
          WritableStreamMarkFirstWriteRequestInFlight(stream);
          const sinkWritePromise = controller._writeAlgorithm(chunk);
          uponPromise(sinkWritePromise, () => {
            WritableStreamFinishInFlightWrite(stream);
            const state = stream._state;
            DequeueValue(controller);
            if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
              const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
              WritableStreamUpdateBackpressure(stream, backpressure);
            }
            WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          }, (reason) => {
            if (stream._state === "writable") {
              WritableStreamDefaultControllerClearAlgorithms(controller);
            }
            WritableStreamFinishInFlightWriteWithError(stream, reason);
          });
        }
        function WritableStreamDefaultControllerGetBackpressure(controller) {
          const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
          return desiredSize <= 0;
        }
        function WritableStreamDefaultControllerError(controller, error2) {
          const stream = controller._controlledWritableStream;
          WritableStreamDefaultControllerClearAlgorithms(controller);
          WritableStreamStartErroring(stream, error2);
        }
        function streamBrandCheckException$2(name) {
          return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
        }
        function defaultControllerBrandCheckException$2(name) {
          return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
        }
        function defaultWriterBrandCheckException(name) {
          return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
        }
        function defaultWriterLockException(name) {
          return new TypeError("Cannot " + name + " a stream using a released writer");
        }
        function defaultWriterClosedPromiseInitialize(writer) {
          writer._closedPromise = newPromise((resolve2, reject) => {
            writer._closedPromise_resolve = resolve2;
            writer._closedPromise_reject = reject;
            writer._closedPromiseState = "pending";
          });
        }
        function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseReject(writer, reason);
        }
        function defaultWriterClosedPromiseInitializeAsResolved(writer) {
          defaultWriterClosedPromiseInitialize(writer);
          defaultWriterClosedPromiseResolve(writer);
        }
        function defaultWriterClosedPromiseReject(writer, reason) {
          if (writer._closedPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._closedPromise);
          writer._closedPromise_reject(reason);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "rejected";
        }
        function defaultWriterClosedPromiseResetToRejected(writer, reason) {
          defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterClosedPromiseResolve(writer) {
          if (writer._closedPromise_resolve === void 0) {
            return;
          }
          writer._closedPromise_resolve(void 0);
          writer._closedPromise_resolve = void 0;
          writer._closedPromise_reject = void 0;
          writer._closedPromiseState = "resolved";
        }
        function defaultWriterReadyPromiseInitialize(writer) {
          writer._readyPromise = newPromise((resolve2, reject) => {
            writer._readyPromise_resolve = resolve2;
            writer._readyPromise_reject = reject;
          });
          writer._readyPromiseState = "pending";
        }
        function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseReject(writer, reason);
        }
        function defaultWriterReadyPromiseInitializeAsResolved(writer) {
          defaultWriterReadyPromiseInitialize(writer);
          defaultWriterReadyPromiseResolve(writer);
        }
        function defaultWriterReadyPromiseReject(writer, reason) {
          if (writer._readyPromise_reject === void 0) {
            return;
          }
          setPromiseIsHandledToTrue(writer._readyPromise);
          writer._readyPromise_reject(reason);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "rejected";
        }
        function defaultWriterReadyPromiseReset(writer) {
          defaultWriterReadyPromiseInitialize(writer);
        }
        function defaultWriterReadyPromiseResetToRejected(writer, reason) {
          defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
        }
        function defaultWriterReadyPromiseResolve(writer) {
          if (writer._readyPromise_resolve === void 0) {
            return;
          }
          writer._readyPromise_resolve(void 0);
          writer._readyPromise_resolve = void 0;
          writer._readyPromise_reject = void 0;
          writer._readyPromiseState = "fulfilled";
        }
        const NativeDOMException = typeof DOMException !== "undefined" ? DOMException : void 0;
        function isDOMExceptionConstructor(ctor) {
          if (!(typeof ctor === "function" || typeof ctor === "object")) {
            return false;
          }
          try {
            new ctor();
            return true;
          } catch (_a) {
            return false;
          }
        }
        function createDOMExceptionPolyfill() {
          const ctor = function DOMException2(message, name) {
            this.message = message || "";
            this.name = name || "Error";
            if (Error.captureStackTrace) {
              Error.captureStackTrace(this, this.constructor);
            }
          };
          ctor.prototype = Object.create(Error.prototype);
          Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
          return ctor;
        }
        const DOMException$1 = isDOMExceptionConstructor(NativeDOMException) ? NativeDOMException : createDOMExceptionPolyfill();
        function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
          const reader = AcquireReadableStreamDefaultReader(source);
          const writer = AcquireWritableStreamDefaultWriter(dest);
          source._disturbed = true;
          let shuttingDown = false;
          let currentWrite = promiseResolvedWith(void 0);
          return newPromise((resolve2, reject) => {
            let abortAlgorithm;
            if (signal !== void 0) {
              abortAlgorithm = () => {
                const error2 = new DOMException$1("Aborted", "AbortError");
                const actions = [];
                if (!preventAbort) {
                  actions.push(() => {
                    if (dest._state === "writable") {
                      return WritableStreamAbort(dest, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                if (!preventCancel) {
                  actions.push(() => {
                    if (source._state === "readable") {
                      return ReadableStreamCancel(source, error2);
                    }
                    return promiseResolvedWith(void 0);
                  });
                }
                shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error2);
              };
              if (signal.aborted) {
                abortAlgorithm();
                return;
              }
              signal.addEventListener("abort", abortAlgorithm);
            }
            function pipeLoop() {
              return newPromise((resolveLoop, rejectLoop) => {
                function next(done) {
                  if (done) {
                    resolveLoop();
                  } else {
                    PerformPromiseThen(pipeStep(), next, rejectLoop);
                  }
                }
                next(false);
              });
            }
            function pipeStep() {
              if (shuttingDown) {
                return promiseResolvedWith(true);
              }
              return PerformPromiseThen(writer._readyPromise, () => {
                return newPromise((resolveRead, rejectRead) => {
                  ReadableStreamDefaultReaderRead(reader, {
                    _chunkSteps: (chunk) => {
                      currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop4);
                      resolveRead(false);
                    },
                    _closeSteps: () => resolveRead(true),
                    _errorSteps: rejectRead
                  });
                });
              });
            }
            isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
              if (!preventAbort) {
                shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
              } else {
                shutdown(true, storedError);
              }
            });
            isOrBecomesClosed(source, reader._closedPromise, () => {
              if (!preventClose) {
                shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
              } else {
                shutdown();
              }
            });
            if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
              const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
              if (!preventCancel) {
                shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
              } else {
                shutdown(true, destClosed);
              }
            }
            setPromiseIsHandledToTrue(pipeLoop());
            function waitForWritesToFinish() {
              const oldCurrentWrite = currentWrite;
              return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
            }
            function isOrBecomesErrored(stream, promise, action) {
              if (stream._state === "errored") {
                action(stream._storedError);
              } else {
                uponRejection(promise, action);
              }
            }
            function isOrBecomesClosed(stream, promise, action) {
              if (stream._state === "closed") {
                action();
              } else {
                uponFulfillment(promise, action);
              }
            }
            function shutdownWithAction(action, originalIsError, originalError) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), doTheRest);
              } else {
                doTheRest();
              }
              function doTheRest() {
                uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
              }
            }
            function shutdown(isError, error2) {
              if (shuttingDown) {
                return;
              }
              shuttingDown = true;
              if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
                uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error2));
              } else {
                finalize(isError, error2);
              }
            }
            function finalize(isError, error2) {
              WritableStreamDefaultWriterRelease(writer);
              ReadableStreamReaderGenericRelease(reader);
              if (signal !== void 0) {
                signal.removeEventListener("abort", abortAlgorithm);
              }
              if (isError) {
                reject(error2);
              } else {
                resolve2(void 0);
              }
            }
          });
        }
        class ReadableStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("desiredSize");
            }
            return ReadableStreamDefaultControllerGetDesiredSize(this);
          }
          close() {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("close");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits close");
            }
            ReadableStreamDefaultControllerClose(this);
          }
          enqueue(chunk = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("enqueue");
            }
            if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
              throw new TypeError("The stream is not in a state that permits enqueue");
            }
            return ReadableStreamDefaultControllerEnqueue(this, chunk);
          }
          error(e2 = void 0) {
            if (!IsReadableStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException$1("error");
            }
            ReadableStreamDefaultControllerError(this, e2);
          }
          [CancelSteps](reason) {
            ResetQueue(this);
            const result = this._cancelAlgorithm(reason);
            ReadableStreamDefaultControllerClearAlgorithms(this);
            return result;
          }
          [PullSteps](readRequest) {
            const stream = this._controlledReadableStream;
            if (this._queue.length > 0) {
              const chunk = DequeueValue(this);
              if (this._closeRequested && this._queue.length === 0) {
                ReadableStreamDefaultControllerClearAlgorithms(this);
                ReadableStreamClose(stream);
              } else {
                ReadableStreamDefaultControllerCallPullIfNeeded(this);
              }
              readRequest._chunkSteps(chunk);
            } else {
              ReadableStreamAddReadRequest(stream, readRequest);
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
          }
        }
        Object.defineProperties(ReadableStreamDefaultController.prototype, {
          close: { enumerable: true },
          enqueue: { enumerable: true },
          error: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStreamDefaultController",
            configurable: true
          });
        }
        function IsReadableStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledReadableStream")) {
            return false;
          }
          return x2 instanceof ReadableStreamDefaultController;
        }
        function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
          const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
          if (!shouldPull) {
            return;
          }
          if (controller._pulling) {
            controller._pullAgain = true;
            return;
          }
          controller._pulling = true;
          const pullPromise = controller._pullAlgorithm();
          uponPromise(pullPromise, () => {
            controller._pulling = false;
            if (controller._pullAgain) {
              controller._pullAgain = false;
              ReadableStreamDefaultControllerCallPullIfNeeded(controller);
            }
          }, (e2) => {
            ReadableStreamDefaultControllerError(controller, e2);
          });
        }
        function ReadableStreamDefaultControllerShouldCallPull(controller) {
          const stream = controller._controlledReadableStream;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return false;
          }
          if (!controller._started) {
            return false;
          }
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            return true;
          }
          const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
          if (desiredSize > 0) {
            return true;
          }
          return false;
        }
        function ReadableStreamDefaultControllerClearAlgorithms(controller) {
          controller._pullAlgorithm = void 0;
          controller._cancelAlgorithm = void 0;
          controller._strategySizeAlgorithm = void 0;
        }
        function ReadableStreamDefaultControllerClose(controller) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          controller._closeRequested = true;
          if (controller._queue.length === 0) {
            ReadableStreamDefaultControllerClearAlgorithms(controller);
            ReadableStreamClose(stream);
          }
        }
        function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
            return;
          }
          const stream = controller._controlledReadableStream;
          if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
            ReadableStreamFulfillReadRequest(stream, chunk, false);
          } else {
            let chunkSize;
            try {
              chunkSize = controller._strategySizeAlgorithm(chunk);
            } catch (chunkSizeE) {
              ReadableStreamDefaultControllerError(controller, chunkSizeE);
              throw chunkSizeE;
            }
            try {
              EnqueueValueWithSize(controller, chunk, chunkSize);
            } catch (enqueueE) {
              ReadableStreamDefaultControllerError(controller, enqueueE);
              throw enqueueE;
            }
          }
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
        }
        function ReadableStreamDefaultControllerError(controller, e2) {
          const stream = controller._controlledReadableStream;
          if (stream._state !== "readable") {
            return;
          }
          ResetQueue(controller);
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamError(stream, e2);
        }
        function ReadableStreamDefaultControllerGetDesiredSize(controller) {
          const state = controller._controlledReadableStream._state;
          if (state === "errored") {
            return null;
          }
          if (state === "closed") {
            return 0;
          }
          return controller._strategyHWM - controller._queueTotalSize;
        }
        function ReadableStreamDefaultControllerHasBackpressure(controller) {
          if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
            return false;
          }
          return true;
        }
        function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
          const state = controller._controlledReadableStream._state;
          if (!controller._closeRequested && state === "readable") {
            return true;
          }
          return false;
        }
        function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
          controller._controlledReadableStream = stream;
          controller._queue = void 0;
          controller._queueTotalSize = void 0;
          ResetQueue(controller);
          controller._started = false;
          controller._closeRequested = false;
          controller._pullAgain = false;
          controller._pulling = false;
          controller._strategySizeAlgorithm = sizeAlgorithm;
          controller._strategyHWM = highWaterMark;
          controller._pullAlgorithm = pullAlgorithm;
          controller._cancelAlgorithm = cancelAlgorithm;
          stream._readableStreamController = controller;
          const startResult = startAlgorithm();
          uponPromise(promiseResolvedWith(startResult), () => {
            controller._started = true;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }, (r2) => {
            ReadableStreamDefaultControllerError(controller, r2);
          });
        }
        function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          let startAlgorithm = () => void 0;
          let pullAlgorithm = () => promiseResolvedWith(void 0);
          let cancelAlgorithm = () => promiseResolvedWith(void 0);
          if (underlyingSource.start !== void 0) {
            startAlgorithm = () => underlyingSource.start(controller);
          }
          if (underlyingSource.pull !== void 0) {
            pullAlgorithm = () => underlyingSource.pull(controller);
          }
          if (underlyingSource.cancel !== void 0) {
            cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
          }
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        }
        function defaultControllerBrandCheckException$1(name) {
          return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
        }
        function ReadableStreamTee(stream, cloneForBranch2) {
          if (IsReadableByteStreamController(stream._readableStreamController)) {
            return ReadableByteStreamTee(stream);
          }
          return ReadableStreamDefaultTee(stream);
        }
        function ReadableStreamDefaultTee(stream, cloneForBranch2) {
          const reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgain = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function pullAlgorithm() {
            if (reading) {
              readAgain = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgain = false;
                  const chunk1 = chunk;
                  const chunk2 = chunk;
                  if (!canceled1) {
                    ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgain) {
                    pullAlgorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableStreamDefaultControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerClose(branch2._readableStreamController);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
          }
          branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
          branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
          uponRejection(reader._closedPromise, (r2) => {
            ReadableStreamDefaultControllerError(branch1._readableStreamController, r2);
            ReadableStreamDefaultControllerError(branch2._readableStreamController, r2);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
          });
          return [branch1, branch2];
        }
        function ReadableByteStreamTee(stream) {
          let reader = AcquireReadableStreamDefaultReader(stream);
          let reading = false;
          let readAgainForBranch1 = false;
          let readAgainForBranch2 = false;
          let canceled1 = false;
          let canceled2 = false;
          let reason1;
          let reason2;
          let branch1;
          let branch2;
          let resolveCancelPromise;
          const cancelPromise = newPromise((resolve2) => {
            resolveCancelPromise = resolve2;
          });
          function forwardReaderError(thisReader) {
            uponRejection(thisReader._closedPromise, (r2) => {
              if (thisReader !== reader) {
                return;
              }
              ReadableByteStreamControllerError(branch1._readableStreamController, r2);
              ReadableByteStreamControllerError(branch2._readableStreamController, r2);
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            });
          }
          function pullWithDefaultReader() {
            if (IsReadableStreamBYOBReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamDefaultReader(stream);
              forwardReaderError(reader);
            }
            const readRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const chunk1 = chunk;
                  let chunk2 = chunk;
                  if (!canceled1 && !canceled2) {
                    try {
                      chunk2 = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                  }
                  if (!canceled1) {
                    ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                  }
                  if (!canceled2) {
                    ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: () => {
                reading = false;
                if (!canceled1) {
                  ReadableByteStreamControllerClose(branch1._readableStreamController);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerClose(branch2._readableStreamController);
                }
                if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
                }
                if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
                }
                if (!canceled1 || !canceled2) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamDefaultReaderRead(reader, readRequest);
          }
          function pullWithBYOBReader(view, forBranch2) {
            if (IsReadableStreamDefaultReader(reader)) {
              ReadableStreamReaderGenericRelease(reader);
              reader = AcquireReadableStreamBYOBReader(stream);
              forwardReaderError(reader);
            }
            const byobBranch = forBranch2 ? branch2 : branch1;
            const otherBranch = forBranch2 ? branch1 : branch2;
            const readIntoRequest = {
              _chunkSteps: (chunk) => {
                queueMicrotask(() => {
                  readAgainForBranch1 = false;
                  readAgainForBranch2 = false;
                  const byobCanceled = forBranch2 ? canceled2 : canceled1;
                  const otherCanceled = forBranch2 ? canceled1 : canceled2;
                  if (!otherCanceled) {
                    let clonedChunk;
                    try {
                      clonedChunk = CloneAsUint8Array(chunk);
                    } catch (cloneE) {
                      ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                      ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                      resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                      return;
                    }
                    if (!byobCanceled) {
                      ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                    }
                    ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                  } else if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  reading = false;
                  if (readAgainForBranch1) {
                    pull1Algorithm();
                  } else if (readAgainForBranch2) {
                    pull2Algorithm();
                  }
                });
              },
              _closeSteps: (chunk) => {
                reading = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!byobCanceled) {
                  ReadableByteStreamControllerClose(byobBranch._readableStreamController);
                }
                if (!otherCanceled) {
                  ReadableByteStreamControllerClose(otherBranch._readableStreamController);
                }
                if (chunk !== void 0) {
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                    ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                  }
                }
                if (!byobCanceled || !otherCanceled) {
                  resolveCancelPromise(void 0);
                }
              },
              _errorSteps: () => {
                reading = false;
              }
            };
            ReadableStreamBYOBReaderRead(reader, view, readIntoRequest);
          }
          function pull1Algorithm() {
            if (reading) {
              readAgainForBranch1 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, false);
            }
            return promiseResolvedWith(void 0);
          }
          function pull2Algorithm() {
            if (reading) {
              readAgainForBranch2 = true;
              return promiseResolvedWith(void 0);
            }
            reading = true;
            const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
            if (byobRequest === null) {
              pullWithDefaultReader();
            } else {
              pullWithBYOBReader(byobRequest._view, true);
            }
            return promiseResolvedWith(void 0);
          }
          function cancel1Algorithm(reason) {
            canceled1 = true;
            reason1 = reason;
            if (canceled2) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function cancel2Algorithm(reason) {
            canceled2 = true;
            reason2 = reason;
            if (canceled1) {
              const compositeReason = CreateArrayFromList([reason1, reason2]);
              const cancelResult = ReadableStreamCancel(stream, compositeReason);
              resolveCancelPromise(cancelResult);
            }
            return cancelPromise;
          }
          function startAlgorithm() {
            return;
          }
          branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
          branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
          forwardReaderError(reader);
          return [branch1, branch2];
        }
        function convertUnderlyingDefaultOrByteSource(source, context) {
          assertDictionary(source, context);
          const original = source;
          const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
          const cancel = original === null || original === void 0 ? void 0 : original.cancel;
          const pull = original === null || original === void 0 ? void 0 : original.pull;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const type = original === null || original === void 0 ? void 0 : original.type;
          return {
            autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
            cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
            pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
            start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
            type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
          };
        }
        function convertUnderlyingSourceCancelCallback(fn, original, context) {
          assertFunction(fn, context);
          return (reason) => promiseCall(fn, original, [reason]);
        }
        function convertUnderlyingSourcePullCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertUnderlyingSourceStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertReadableStreamType(type, context) {
          type = `${type}`;
          if (type !== "bytes") {
            throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
          }
          return type;
        }
        function convertReaderOptions(options2, context) {
          assertDictionary(options2, context);
          const mode = options2 === null || options2 === void 0 ? void 0 : options2.mode;
          return {
            mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
          };
        }
        function convertReadableStreamReaderMode(mode, context) {
          mode = `${mode}`;
          if (mode !== "byob") {
            throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
          }
          return mode;
        }
        function convertIteratorOptions(options2, context) {
          assertDictionary(options2, context);
          const preventCancel = options2 === null || options2 === void 0 ? void 0 : options2.preventCancel;
          return { preventCancel: Boolean(preventCancel) };
        }
        function convertPipeOptions(options2, context) {
          assertDictionary(options2, context);
          const preventAbort = options2 === null || options2 === void 0 ? void 0 : options2.preventAbort;
          const preventCancel = options2 === null || options2 === void 0 ? void 0 : options2.preventCancel;
          const preventClose = options2 === null || options2 === void 0 ? void 0 : options2.preventClose;
          const signal = options2 === null || options2 === void 0 ? void 0 : options2.signal;
          if (signal !== void 0) {
            assertAbortSignal(signal, `${context} has member 'signal' that`);
          }
          return {
            preventAbort: Boolean(preventAbort),
            preventCancel: Boolean(preventCancel),
            preventClose: Boolean(preventClose),
            signal
          };
        }
        function assertAbortSignal(signal, context) {
          if (!isAbortSignal2(signal)) {
            throw new TypeError(`${context} is not an AbortSignal.`);
          }
        }
        function convertReadableWritablePair(pair, context) {
          assertDictionary(pair, context);
          const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
          assertRequiredField(readable, "readable", "ReadableWritablePair");
          assertReadableStream(readable, `${context} has member 'readable' that`);
          const writable3 = pair === null || pair === void 0 ? void 0 : pair.writable;
          assertRequiredField(writable3, "writable", "ReadableWritablePair");
          assertWritableStream(writable3, `${context} has member 'writable' that`);
          return { readable, writable: writable3 };
        }
        class ReadableStream2 {
          constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
            if (rawUnderlyingSource === void 0) {
              rawUnderlyingSource = null;
            } else {
              assertObject(rawUnderlyingSource, "First parameter");
            }
            const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
            const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
            InitializeReadableStream(this);
            if (underlyingSource.type === "bytes") {
              if (strategy.size !== void 0) {
                throw new RangeError("The strategy for a byte stream cannot have a size function");
              }
              const highWaterMark = ExtractHighWaterMark(strategy, 0);
              SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
            } else {
              const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
              const highWaterMark = ExtractHighWaterMark(strategy, 1);
              SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
            }
          }
          get locked() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("locked");
            }
            return IsReadableStreamLocked(this);
          }
          cancel(reason = void 0) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("cancel"));
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
            }
            return ReadableStreamCancel(this, reason);
          }
          getReader(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("getReader");
            }
            const options2 = convertReaderOptions(rawOptions, "First parameter");
            if (options2.mode === void 0) {
              return AcquireReadableStreamDefaultReader(this);
            }
            return AcquireReadableStreamBYOBReader(this);
          }
          pipeThrough(rawTransform, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("pipeThrough");
            }
            assertRequiredArgument(rawTransform, 1, "pipeThrough");
            const transform = convertReadableWritablePair(rawTransform, "First parameter");
            const options2 = convertPipeOptions(rawOptions, "Second parameter");
            if (IsReadableStreamLocked(this)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
            }
            if (IsWritableStreamLocked(transform.writable)) {
              throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
            }
            const promise = ReadableStreamPipeTo(this, transform.writable, options2.preventClose, options2.preventAbort, options2.preventCancel, options2.signal);
            setPromiseIsHandledToTrue(promise);
            return transform.readable;
          }
          pipeTo(destination, rawOptions = {}) {
            if (!IsReadableStream(this)) {
              return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
            }
            if (destination === void 0) {
              return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
            }
            if (!IsWritableStream(destination)) {
              return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
            }
            let options2;
            try {
              options2 = convertPipeOptions(rawOptions, "Second parameter");
            } catch (e2) {
              return promiseRejectedWith(e2);
            }
            if (IsReadableStreamLocked(this)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
            }
            if (IsWritableStreamLocked(destination)) {
              return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
            }
            return ReadableStreamPipeTo(this, destination, options2.preventClose, options2.preventAbort, options2.preventCancel, options2.signal);
          }
          tee() {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("tee");
            }
            const branches = ReadableStreamTee(this);
            return CreateArrayFromList(branches);
          }
          values(rawOptions = void 0) {
            if (!IsReadableStream(this)) {
              throw streamBrandCheckException$1("values");
            }
            const options2 = convertIteratorOptions(rawOptions, "First parameter");
            return AcquireReadableStreamAsyncIterator(this, options2.preventCancel);
          }
        }
        Object.defineProperties(ReadableStream2.prototype, {
          cancel: { enumerable: true },
          getReader: { enumerable: true },
          pipeThrough: { enumerable: true },
          pipeTo: { enumerable: true },
          tee: { enumerable: true },
          values: { enumerable: true },
          locked: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.toStringTag, {
            value: "ReadableStream",
            configurable: true
          });
        }
        if (typeof SymbolPolyfill.asyncIterator === "symbol") {
          Object.defineProperty(ReadableStream2.prototype, SymbolPolyfill.asyncIterator, {
            value: ReadableStream2.prototype.values,
            writable: true,
            configurable: true
          });
        }
        function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableStreamDefaultController.prototype);
          SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
          return stream;
        }
        function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
          const stream = Object.create(ReadableStream2.prototype);
          InitializeReadableStream(stream);
          const controller = Object.create(ReadableByteStreamController.prototype);
          SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
          return stream;
        }
        function InitializeReadableStream(stream) {
          stream._state = "readable";
          stream._reader = void 0;
          stream._storedError = void 0;
          stream._disturbed = false;
        }
        function IsReadableStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_readableStreamController")) {
            return false;
          }
          return x2 instanceof ReadableStream2;
        }
        function IsReadableStreamLocked(stream) {
          if (stream._reader === void 0) {
            return false;
          }
          return true;
        }
        function ReadableStreamCancel(stream, reason) {
          stream._disturbed = true;
          if (stream._state === "closed") {
            return promiseResolvedWith(void 0);
          }
          if (stream._state === "errored") {
            return promiseRejectedWith(stream._storedError);
          }
          ReadableStreamClose(stream);
          const reader = stream._reader;
          if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._closeSteps(void 0);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
          const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
          return transformPromiseWith(sourceCancelPromise, noop4);
        }
        function ReadableStreamClose(stream) {
          stream._state = "closed";
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseResolve(reader);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._closeSteps();
            });
            reader._readRequests = new SimpleQueue();
          }
        }
        function ReadableStreamError(stream, e2) {
          stream._state = "errored";
          stream._storedError = e2;
          const reader = stream._reader;
          if (reader === void 0) {
            return;
          }
          defaultReaderClosedPromiseReject(reader, e2);
          if (IsReadableStreamDefaultReader(reader)) {
            reader._readRequests.forEach((readRequest) => {
              readRequest._errorSteps(e2);
            });
            reader._readRequests = new SimpleQueue();
          } else {
            reader._readIntoRequests.forEach((readIntoRequest) => {
              readIntoRequest._errorSteps(e2);
            });
            reader._readIntoRequests = new SimpleQueue();
          }
        }
        function streamBrandCheckException$1(name) {
          return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
        }
        function convertQueuingStrategyInit(init2, context) {
          assertDictionary(init2, context);
          const highWaterMark = init2 === null || init2 === void 0 ? void 0 : init2.highWaterMark;
          assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
          return {
            highWaterMark: convertUnrestrictedDouble(highWaterMark)
          };
        }
        const byteLengthSizeFunction = (chunk) => {
          return chunk.byteLength;
        };
        Object.defineProperty(byteLengthSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class ByteLengthQueuingStrategy {
          constructor(options2) {
            assertRequiredArgument(options2, 1, "ByteLengthQueuingStrategy");
            options2 = convertQueuingStrategyInit(options2, "First parameter");
            this._byteLengthQueuingStrategyHighWaterMark = options2.highWaterMark;
          }
          get highWaterMark() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("highWaterMark");
            }
            return this._byteLengthQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsByteLengthQueuingStrategy(this)) {
              throw byteLengthBrandCheckException("size");
            }
            return byteLengthSizeFunction;
          }
        }
        Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(ByteLengthQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "ByteLengthQueuingStrategy",
            configurable: true
          });
        }
        function byteLengthBrandCheckException(name) {
          return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
        }
        function IsByteLengthQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_byteLengthQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof ByteLengthQueuingStrategy;
        }
        const countSizeFunction = () => {
          return 1;
        };
        Object.defineProperty(countSizeFunction, "name", {
          value: "size",
          configurable: true
        });
        class CountQueuingStrategy {
          constructor(options2) {
            assertRequiredArgument(options2, 1, "CountQueuingStrategy");
            options2 = convertQueuingStrategyInit(options2, "First parameter");
            this._countQueuingStrategyHighWaterMark = options2.highWaterMark;
          }
          get highWaterMark() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("highWaterMark");
            }
            return this._countQueuingStrategyHighWaterMark;
          }
          get size() {
            if (!IsCountQueuingStrategy(this)) {
              throw countBrandCheckException("size");
            }
            return countSizeFunction;
          }
        }
        Object.defineProperties(CountQueuingStrategy.prototype, {
          highWaterMark: { enumerable: true },
          size: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(CountQueuingStrategy.prototype, SymbolPolyfill.toStringTag, {
            value: "CountQueuingStrategy",
            configurable: true
          });
        }
        function countBrandCheckException(name) {
          return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
        }
        function IsCountQueuingStrategy(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_countQueuingStrategyHighWaterMark")) {
            return false;
          }
          return x2 instanceof CountQueuingStrategy;
        }
        function convertTransformer(original, context) {
          assertDictionary(original, context);
          const flush = original === null || original === void 0 ? void 0 : original.flush;
          const readableType = original === null || original === void 0 ? void 0 : original.readableType;
          const start = original === null || original === void 0 ? void 0 : original.start;
          const transform = original === null || original === void 0 ? void 0 : original.transform;
          const writableType = original === null || original === void 0 ? void 0 : original.writableType;
          return {
            flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
            readableType,
            start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
            transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
            writableType
          };
        }
        function convertTransformerFlushCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => promiseCall(fn, original, [controller]);
        }
        function convertTransformerStartCallback(fn, original, context) {
          assertFunction(fn, context);
          return (controller) => reflectCall(fn, original, [controller]);
        }
        function convertTransformerTransformCallback(fn, original, context) {
          assertFunction(fn, context);
          return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
        }
        class TransformStream {
          constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
            if (rawTransformer === void 0) {
              rawTransformer = null;
            }
            const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
            const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
            const transformer = convertTransformer(rawTransformer, "First parameter");
            if (transformer.readableType !== void 0) {
              throw new RangeError("Invalid readableType specified");
            }
            if (transformer.writableType !== void 0) {
              throw new RangeError("Invalid writableType specified");
            }
            const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
            const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
            const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
            const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
            let startPromise_resolve;
            const startPromise = newPromise((resolve2) => {
              startPromise_resolve = resolve2;
            });
            InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
            SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
            if (transformer.start !== void 0) {
              startPromise_resolve(transformer.start(this._transformStreamController));
            } else {
              startPromise_resolve(void 0);
            }
          }
          get readable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("readable");
            }
            return this._readable;
          }
          get writable() {
            if (!IsTransformStream(this)) {
              throw streamBrandCheckException("writable");
            }
            return this._writable;
          }
        }
        Object.defineProperties(TransformStream.prototype, {
          readable: { enumerable: true },
          writable: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStream.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStream",
            configurable: true
          });
        }
        function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
          function startAlgorithm() {
            return startPromise;
          }
          function writeAlgorithm(chunk) {
            return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
          }
          function abortAlgorithm(reason) {
            return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
          }
          function closeAlgorithm() {
            return TransformStreamDefaultSinkCloseAlgorithm(stream);
          }
          stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
          function pullAlgorithm() {
            return TransformStreamDefaultSourcePullAlgorithm(stream);
          }
          function cancelAlgorithm(reason) {
            TransformStreamErrorWritableAndUnblockWrite(stream, reason);
            return promiseResolvedWith(void 0);
          }
          stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          stream._backpressure = void 0;
          stream._backpressureChangePromise = void 0;
          stream._backpressureChangePromise_resolve = void 0;
          TransformStreamSetBackpressure(stream, true);
          stream._transformStreamController = void 0;
        }
        function IsTransformStream(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_transformStreamController")) {
            return false;
          }
          return x2 instanceof TransformStream;
        }
        function TransformStreamError(stream, e2) {
          ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e2);
          TransformStreamErrorWritableAndUnblockWrite(stream, e2);
        }
        function TransformStreamErrorWritableAndUnblockWrite(stream, e2) {
          TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
          WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e2);
          if (stream._backpressure) {
            TransformStreamSetBackpressure(stream, false);
          }
        }
        function TransformStreamSetBackpressure(stream, backpressure) {
          if (stream._backpressureChangePromise !== void 0) {
            stream._backpressureChangePromise_resolve();
          }
          stream._backpressureChangePromise = newPromise((resolve2) => {
            stream._backpressureChangePromise_resolve = resolve2;
          });
          stream._backpressure = backpressure;
        }
        class TransformStreamDefaultController {
          constructor() {
            throw new TypeError("Illegal constructor");
          }
          get desiredSize() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("desiredSize");
            }
            const readableController = this._controlledTransformStream._readable._readableStreamController;
            return ReadableStreamDefaultControllerGetDesiredSize(readableController);
          }
          enqueue(chunk = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("enqueue");
            }
            TransformStreamDefaultControllerEnqueue(this, chunk);
          }
          error(reason = void 0) {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("error");
            }
            TransformStreamDefaultControllerError(this, reason);
          }
          terminate() {
            if (!IsTransformStreamDefaultController(this)) {
              throw defaultControllerBrandCheckException("terminate");
            }
            TransformStreamDefaultControllerTerminate(this);
          }
        }
        Object.defineProperties(TransformStreamDefaultController.prototype, {
          enqueue: { enumerable: true },
          error: { enumerable: true },
          terminate: { enumerable: true },
          desiredSize: { enumerable: true }
        });
        if (typeof SymbolPolyfill.toStringTag === "symbol") {
          Object.defineProperty(TransformStreamDefaultController.prototype, SymbolPolyfill.toStringTag, {
            value: "TransformStreamDefaultController",
            configurable: true
          });
        }
        function IsTransformStreamDefaultController(x2) {
          if (!typeIsObject(x2)) {
            return false;
          }
          if (!Object.prototype.hasOwnProperty.call(x2, "_controlledTransformStream")) {
            return false;
          }
          return x2 instanceof TransformStreamDefaultController;
        }
        function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm) {
          controller._controlledTransformStream = stream;
          stream._transformStreamController = controller;
          controller._transformAlgorithm = transformAlgorithm;
          controller._flushAlgorithm = flushAlgorithm;
        }
        function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
          const controller = Object.create(TransformStreamDefaultController.prototype);
          let transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
          let flushAlgorithm = () => promiseResolvedWith(void 0);
          if (transformer.transform !== void 0) {
            transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
          }
          if (transformer.flush !== void 0) {
            flushAlgorithm = () => transformer.flush(controller);
          }
          SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm);
        }
        function TransformStreamDefaultControllerClearAlgorithms(controller) {
          controller._transformAlgorithm = void 0;
          controller._flushAlgorithm = void 0;
        }
        function TransformStreamDefaultControllerEnqueue(controller, chunk) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
            throw new TypeError("Readable side is not in a state that permits enqueue");
          }
          try {
            ReadableStreamDefaultControllerEnqueue(readableController, chunk);
          } catch (e2) {
            TransformStreamErrorWritableAndUnblockWrite(stream, e2);
            throw stream._readable._storedError;
          }
          const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
          if (backpressure !== stream._backpressure) {
            TransformStreamSetBackpressure(stream, true);
          }
        }
        function TransformStreamDefaultControllerError(controller, e2) {
          TransformStreamError(controller._controlledTransformStream, e2);
        }
        function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
          const transformPromise = controller._transformAlgorithm(chunk);
          return transformPromiseWith(transformPromise, void 0, (r2) => {
            TransformStreamError(controller._controlledTransformStream, r2);
            throw r2;
          });
        }
        function TransformStreamDefaultControllerTerminate(controller) {
          const stream = controller._controlledTransformStream;
          const readableController = stream._readable._readableStreamController;
          ReadableStreamDefaultControllerClose(readableController);
          const error2 = new TypeError("TransformStream terminated");
          TransformStreamErrorWritableAndUnblockWrite(stream, error2);
        }
        function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
          const controller = stream._transformStreamController;
          if (stream._backpressure) {
            const backpressureChangePromise = stream._backpressureChangePromise;
            return transformPromiseWith(backpressureChangePromise, () => {
              const writable3 = stream._writable;
              const state = writable3._state;
              if (state === "erroring") {
                throw writable3._storedError;
              }
              return TransformStreamDefaultControllerPerformTransform(controller, chunk);
            });
          }
          return TransformStreamDefaultControllerPerformTransform(controller, chunk);
        }
        function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
          TransformStreamError(stream, reason);
          return promiseResolvedWith(void 0);
        }
        function TransformStreamDefaultSinkCloseAlgorithm(stream) {
          const readable = stream._readable;
          const controller = stream._transformStreamController;
          const flushPromise = controller._flushAlgorithm();
          TransformStreamDefaultControllerClearAlgorithms(controller);
          return transformPromiseWith(flushPromise, () => {
            if (readable._state === "errored") {
              throw readable._storedError;
            }
            ReadableStreamDefaultControllerClose(readable._readableStreamController);
          }, (r2) => {
            TransformStreamError(stream, r2);
            throw readable._storedError;
          });
        }
        function TransformStreamDefaultSourcePullAlgorithm(stream) {
          TransformStreamSetBackpressure(stream, false);
          return stream._backpressureChangePromise;
        }
        function defaultControllerBrandCheckException(name) {
          return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
        }
        function streamBrandCheckException(name) {
          return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
        }
        exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
        exports2.CountQueuingStrategy = CountQueuingStrategy;
        exports2.ReadableByteStreamController = ReadableByteStreamController;
        exports2.ReadableStream = ReadableStream2;
        exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
        exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
        exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
        exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
        exports2.TransformStream = TransformStream;
        exports2.TransformStreamDefaultController = TransformStreamDefaultController;
        exports2.WritableStream = WritableStream;
        exports2.WritableStreamDefaultController = WritableStreamDefaultController;
        exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
        Object.defineProperty(exports2, "__esModule", { value: true });
      });
    })(ponyfill_es2018, ponyfill_es2018.exports);
    POOL_SIZE$1 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = require("node:process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, require("node:stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error2) {
          process2.emitWarning = emitWarning;
          throw error2;
        }
      } catch (error2) {
        Object.assign(globalThis, ponyfill_es2018.exports);
      }
    }
    try {
      const { Blob: Blob3 } = require("buffer");
      if (Blob3 && !Blob3.prototype.stream) {
        Blob3.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE$1));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error2) {
    }
    POOL_SIZE = 65536;
    _Blob = class Blob {
      #parts = [];
      #type = "";
      #size = 0;
      constructor(blobParts = [], options2 = {}) {
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options2 !== "object" && typeof options2 !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options2 === null)
          options2 = {};
        const encoder = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof Blob) {
            part = element;
          } else {
            part = encoder.encode(element);
          }
          this.#size += ArrayBuffer.isView(part) ? part.byteLength : part.size;
          this.#parts.push(part);
        }
        const type = options2.type === void 0 ? "" : String(options2.type);
        this.#type = /^[\x20-\x7E]*$/.test(type) ? type : "";
      }
      get size() {
        return this.#size;
      }
      get type() {
        return this.#type;
      }
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(this.#parts, false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of toIterator(this.#parts, false)) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(this.#parts, true);
        return new globalThis.ReadableStream({
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = this.#parts;
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size2;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new Blob([], { type: String(type).toLowerCase() });
        blob.#size = span;
        blob.#parts = blobParts;
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    };
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob2 = _Blob;
    Blob$1 = Blob2;
    _File = class File2 extends Blob$1 {
      #lastModified = 0;
      #name = "";
      constructor(fileBits, fileName, options2 = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options2);
        if (options2 === null)
          options2 = {};
        const lastModified = options2.lastModified === void 0 ? Date.now() : Number(options2.lastModified);
        if (!Number.isNaN(lastModified)) {
          this.#lastModified = lastModified;
        }
        this.#name = String(fileName);
      }
      get name() {
        return this.#name;
      }
      get lastModified() {
        return this.#lastModified;
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
    };
    File = _File;
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f2 = (a, b, c) => (a += "", /^(Blob|File)$/.test(b && b[t]) ? [(c = c !== void 0 ? c + "" : b[t] == "File" ? b.name : "blob", a), b.name !== c || b[t] == "blob" ? new File([b], c, b) : b] : [a, b + ""]);
    e = (c, f3) => (f3 ? c : c.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n, a, e2) => {
      if (a.length < e2) {
        throw new TypeError(`Failed to execute '${n}' on 'FormData': ${e2} arguments required, but only ${a.length} present.`);
      }
    };
    FormData = class FormData2 {
      #d = [];
      constructor(...a) {
        if (a.length)
          throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o) {
        return o && typeof o === "object" && o[t] === "FormData" && !m.some((m2) => typeof o[m2] != "function");
      }
      append(...a) {
        x("append", arguments, 2);
        this.#d.push(f2(...a));
      }
      delete(a) {
        x("delete", arguments, 1);
        a += "";
        this.#d = this.#d.filter(([b]) => b !== a);
      }
      get(a) {
        x("get", arguments, 1);
        a += "";
        for (var b = this.#d, l = b.length, c = 0; c < l; c++)
          if (b[c][0] === a)
            return b[c][1];
        return null;
      }
      getAll(a, b) {
        x("getAll", arguments, 1);
        b = [];
        a += "";
        this.#d.forEach((c) => c[0] === a && b.push(c[1]));
        return b;
      }
      has(a) {
        x("has", arguments, 1);
        a += "";
        return this.#d.some((b) => b[0] === a);
      }
      forEach(a, b) {
        x("forEach", arguments, 1);
        for (var [c, d] of this)
          a.call(b, d, c, this);
      }
      set(...a) {
        x("set", arguments, 2);
        var b = [], c = true;
        a = f2(...a);
        this.#d.forEach((d) => {
          d[0] === a[0] ? c && (c = !b.push(a)) : b.push(d);
        });
        c && b.push(a);
        this.#d = b;
      }
      *entries() {
        yield* this.#d;
      }
      *keys() {
        for (var [a] of this)
          yield a;
      }
      *values() {
        for (var [, a] of this)
          yield a;
      }
    };
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
    };
    INTERNALS$2 = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = Buffer.from(body.toString());
        } else if (isBlob(body))
          ;
        else if (Buffer.isBuffer(body))
          ;
        else if (import_node_util2.types.isAnyArrayBuffer(body)) {
          body = Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_node_stream2.default)
          ;
        else if (body instanceof FormData) {
          body = formDataToBlob(body);
          boundary = body.type.split("=")[1];
        } else {
          body = Buffer.from(String(body));
        }
        let stream = body;
        if (Buffer.isBuffer(body)) {
          stream = import_node_stream2.default.Readable.from(body);
        } else if (isBlob(body)) {
          stream = import_node_stream2.default.Readable.from(body.stream());
        }
        this[INTERNALS$2] = {
          body,
          stream,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_node_stream2.default) {
          body.on("error", (error_) => {
            const error2 = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
            this[INTERNALS$2].error = error2;
          });
        }
      }
      get body() {
        return this[INTERNALS$2].stream;
      }
      get bodyUsed() {
        return this[INTERNALS$2].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async formData() {
        const ct = this.headers.get("content-type");
        if (ct.startsWith("application/x-www-form-urlencoded")) {
          const formData = new FormData();
          const parameters = new URLSearchParams(await this.text());
          for (const [name, value] of parameters) {
            formData.append(name, value);
          }
          return formData;
        }
        const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
        return toFormData2(this.body, ct);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
        const buf = await this.buffer();
        return new Blob$1([buf], {
          type: ct
        });
      }
      async json() {
        const buffer = await consumeBody(this);
        return JSON.parse(buffer.toString());
      }
      async text() {
        const buffer = await consumeBody(this);
        return buffer.toString();
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Body.prototype.buffer = (0, import_node_util2.deprecate)(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance[INTERNALS$2];
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_node_stream2.default && typeof body.getBoundary !== "function") {
        p1 = new import_node_stream2.PassThrough({ highWaterMark });
        p2 = new import_node_stream2.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS$2].stream = p1;
        body = p2;
      }
      return body;
    };
    getNonSpecFormDataBoundary = (0, import_node_util2.deprecate)((body) => body.getBoundary(), "form-data doesn't follow the spec and requires special treatment. Use alternative package", "https://github.com/node-fetch/node-fetch/issues/1167");
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (Buffer.isBuffer(body) || import_node_util2.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body instanceof FormData) {
        return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
      }
      if (body instanceof import_node_stream2.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request[INTERNALS$2];
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      return null;
    };
    writeToStream = (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else {
        body.pipe(dest);
      }
    };
    validateHeaderName = typeof import_node_http2.default.validateHeaderName === "function" ? import_node_http2.default.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const error2 = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw error2;
      }
    };
    validateHeaderValue = typeof import_node_http2.default.validateHeaderValue === "function" ? import_node_http2.default.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const error2 = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(error2, "code", { value: "ERR_INVALID_CHAR" });
        throw error2;
      }
    };
    Headers = class extends URLSearchParams {
      constructor(init2) {
        let result = [];
        if (init2 instanceof Headers) {
          const raw = init2.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init2 == null)
          ;
        else if (typeof init2 === "object" && !import_node_util2.types.isBoxedPrimitive(init2)) {
          const method = init2[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init2));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init2].map((pair) => {
              if (typeof pair !== "object" || import_node_util2.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(target, String(name).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback, thisArg = void 0) {
        for (const name of this.keys()) {
          Reflect.apply(callback, thisArg, [this.get(name), name, this]);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key) => {
          result[key] = this.getAll(key);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key) => {
          const values = this.getAll(key);
          if (key === "host") {
            result[key] = values[0];
          } else {
            result[key] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
    redirectStatus = new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
    INTERNALS$1 = Symbol("Response internals");
    Response = class extends Body {
      constructor(body = null, options2 = {}) {
        super(body, options2);
        const status = options2.status != null ? options2.status : 200;
        const headers = new Headers(options2.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          type: "default",
          url: options2.url,
          status,
          statusText: options2.statusText || "",
          headers,
          counter: options2.counter,
          highWaterMark: options2.highWaterMark
        };
      }
      get type() {
        return this[INTERNALS$1].type;
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      get highWaterMark() {
        return this[INTERNALS$1].highWaterMark;
      }
      clone() {
        return new Response(clone(this, this.highWaterMark), {
          type: this.type,
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size,
          highWaterMark: this.highWaterMark
        });
      }
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      static error() {
        const response = new Response(null, { status: 0, statusText: "" });
        response[INTERNALS$1].type = "error";
        return response;
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response.prototype, {
      type: { enumerable: true },
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
    };
    ReferrerPolicy = new Set([
      "",
      "no-referrer",
      "no-referrer-when-downgrade",
      "same-origin",
      "origin",
      "strict-origin",
      "origin-when-cross-origin",
      "strict-origin-when-cross-origin",
      "unsafe-url"
    ]);
    DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
    INTERNALS = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS] === "object";
    };
    Request = class extends Body {
      constructor(input, init2 = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        if (parsedURL.username !== "" || parsedURL.password !== "") {
          throw new TypeError(`${parsedURL} is an url with embedded credentails.`);
        }
        let method = init2.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init2.size || input.size || 0
        });
        const headers = new Headers(init2.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.set("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init2) {
          signal = init2.signal;
        }
        if (signal != null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
        }
        let referrer = init2.referrer == null ? input.referrer : init2.referrer;
        if (referrer === "") {
          referrer = "no-referrer";
        } else if (referrer) {
          const parsedReferrer = new URL(referrer);
          referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
        } else {
          referrer = void 0;
        }
        this[INTERNALS] = {
          method,
          redirect: init2.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal,
          referrer
        };
        this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
        this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
        this.counter = init2.counter || input.counter || 0;
        this.agent = init2.agent || input.agent;
        this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
        this.referrerPolicy = init2.referrerPolicy || input.referrerPolicy || "";
      }
      get method() {
        return this[INTERNALS].method;
      }
      get url() {
        return (0, import_node_url2.format)(this[INTERNALS].parsedURL);
      }
      get headers() {
        return this[INTERNALS].headers;
      }
      get redirect() {
        return this[INTERNALS].redirect;
      }
      get signal() {
        return this[INTERNALS].signal;
      }
      get referrer() {
        if (this[INTERNALS].referrer === "no-referrer") {
          return "";
        }
        if (this[INTERNALS].referrer === "client") {
          return "about:client";
        }
        if (this[INTERNALS].referrer) {
          return this[INTERNALS].referrer.toString();
        }
        return void 0;
      }
      get referrerPolicy() {
        return this[INTERNALS].referrerPolicy;
      }
      set referrerPolicy(referrerPolicy) {
        this[INTERNALS].referrerPolicy = validateReferrerPolicy(referrerPolicy);
      }
      clone() {
        return new Request(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true },
      referrer: { enumerable: true },
      referrerPolicy: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS];
      const headers = new Headers(request[INTERNALS].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (request.referrerPolicy === "") {
        request.referrerPolicy = DEFAULT_REFERRER_POLICY;
      }
      if (request.referrer && request.referrer !== "no-referrer") {
        request[INTERNALS].referrer = determineRequestsReferrer(request);
      } else {
        request[INTERNALS].referrer = "no-referrer";
      }
      if (request[INTERNALS].referrer instanceof URL) {
        headers.set("Referer", request.referrer);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate,br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      const search = getSearch(parsedURL);
      const options2 = {
        path: parsedURL.pathname + search,
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return {
        parsedURL,
        options: options2
      };
    };
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
    supportedSchemas = new Set(["data:", "http:", "https:"]);
  }
});

// node_modules/@sveltejs/adapter-netlify/files/shims.js
var init_shims = __esm({
  "node_modules/@sveltejs/adapter-netlify/files/shims.js"() {
    init_install_fetch();
  }
});

// node_modules/@sveltejs/kit/dist/chunks/url.js
function get_single_valued_header(headers, key) {
  const value = headers[key];
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return void 0;
    }
    if (value.length > 1) {
      throw new Error(`Multiple headers provided for ${key}. Multiple may be provided only for set-cookie`);
    }
    return value[0];
  }
  return value;
}
function resolve(base2, path2) {
  if (scheme.test(path2))
    return path2;
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path2);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path2.slice(path_match[0].length).split("/") : path2.split("/");
  baseparts.pop();
  for (let i2 = 0; i2 < pathparts.length; i2 += 1) {
    const part = pathparts[i2];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function is_root_relative(path2) {
  return path2[0] === "/" && path2[1] !== "/";
}
var absolute, scheme;
var init_url = __esm({
  "node_modules/@sveltejs/kit/dist/chunks/url.js"() {
    init_shims();
    absolute = /^([a-z]+:)?\/?\//;
    scheme = /^[a-z]+:/;
  }
});

// node_modules/@sveltejs/kit/dist/chunks/error.js
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
var init_error = __esm({
  "node_modules/@sveltejs/kit/dist/chunks/error.js"() {
    init_shims();
  }
});

// node_modules/@sveltejs/kit/dist/ssr.js
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s3) {
  return typeof s3 === "string" || s3 instanceof String;
}
function is_content_type_textual(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}
async function render_endpoint(request, route, match) {
  const mod = await route.load();
  const handler2 = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler2) {
    return;
  }
  const params = route.params(match);
  const response = await handler2({ ...request, params });
  const preface = `Invalid response from route ${request.path}`;
  if (!response) {
    return;
  }
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  let { status = 200, body, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = get_single_valued_header(headers, "content-type");
  const is_type_textual = is_content_type_textual(type);
  if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = { ...headers, "content-type": "application/json; charset=utf-8" };
    normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
  } else {
    normalized_body = body;
  }
  return { status, body: normalized_body, headers };
}
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i2) {
    names.set(entry[0], getName(i2));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i2) {
          return i2 in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i2) {
            statements_1.push(name + "[" + i2 + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i2 = 0; i2 < str.length; i2 += 1) {
    var char = str.charAt(i2);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i2];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop2() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function writable(value, start = noop2) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop2) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop2;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
function hash(value) {
  let hash2 = 5381;
  let i2 = value.length;
  if (typeof value === "string") {
    while (i2)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
  } else {
    while (i2)
      hash2 = hash2 * 33 ^ value[--i2];
  }
  return (hash2 >>> 0).toString(36);
}
function escape_json_string_in_html(str) {
  return escape(str, escape_json_string_in_html_dict, (code) => `\\u${code.toString(16).toUpperCase()}`);
}
function escape_html_attr(str) {
  return '"' + escape(str, escape_html_attr_dict, (code) => `&#${code};`) + '"';
}
function escape(str, dict, unicode_encoder) {
  let result = "";
  for (let i2 = 0; i2 < str.length; i2 += 1) {
    const char = str.charAt(i2);
    const code = char.charCodeAt(0);
    if (char in dict) {
      result += dict[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i2 + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i2];
      } else {
        result += unicode_encoder(code);
      }
    } else {
      result += char;
    }
  }
  return result;
}
async function render_response({
  branch,
  options: options2,
  $session,
  page_config,
  status,
  error: error2,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options2.get_stack(error2);
  }
  if (page_config.ssr) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      props[`props_${i2}`] = await branch[i2].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
    init2 += options2.service_worker ? '<script async custom-element="amp-install-serviceworker" src="https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js"><\/script>' : "";
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page && page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${page && page.path ? try_serialize(page.path, (error3) => {
      throw new Error(`Failed to serialize page.path: ${error3.message}`);
    }) : null},
						query: new URLSearchParams(${page && page.query ? s$1(page.query.toString()) : ""}),
						params: ${page && page.params ? try_serialize(page.params, (error3) => {
      throw new Error(`Failed to serialize page.params: ${error3.message}`);
    }) : null}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options2.service_worker) {
    init2 += options2.amp ? `<amp-install-serviceworker src="${options2.service_worker}" layout="nodisplay"></amp-install-serviceworker>` : `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    let attributes = `type="application/json" data-type="svelte-data" data-url=${escape_html_attr(url)}`;
    if (body2)
      attributes += ` data-body="${hash(body2)}"`;
    return `<script ${attributes}>${json}<\/script>`;
  }).join("\n\n	")}
		`;
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(coalesce_to_error(err));
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize({ ...error2, name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  if (loaded.context) {
    throw new Error('You are returning "context" from a load function. "context" was renamed to "stuff", please adjust your code accordingly.');
  }
  return loaded;
}
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  stuff,
  prerender_enabled,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let set_cookie_headers = [];
  let loaded;
  const page_proxy = new Proxy(page, {
    get: (target, prop, receiver) => {
      if (prop === "query" && prerender_enabled) {
        throw new Error("Cannot access query on a page with prerendering enabled");
      }
      return Reflect.get(target, prop, receiver);
    }
  });
  if (module2.load) {
    const load_input = {
      page: page_proxy,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        const resolved = resolve(request.path, url.split("?")[0]);
        let response;
        const prefix = options2.paths.assets || options2.paths.base;
        const filename = (resolved.startsWith(prefix) ? resolved.slice(prefix.length) : resolved).slice(1);
        const filename_html = `${filename}/index.html`;
        const asset = options2.manifest.assets.find((d) => d.file === filename || d.file === filename_html);
        if (asset) {
          response = options2.read ? new Response(options2.read(asset.file), {
            headers: asset.type ? { "content-type": asset.type } : {}
          }) : await fetch(`http://${page.host}/${asset.file}`, opts);
        } else if (is_root_relative(resolved)) {
          const relative = resolved;
          const headers = {
            ...opts.headers
          };
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            headers.cookie = request.headers.cookie;
            if (!headers.authorization) {
              headers.authorization = request.headers.authorization;
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const search = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
          const rendered = await respond({
            host: request.host,
            method: opts.method || "GET",
            headers,
            path: relative,
            rawBody: opts.body == null ? null : new TextEncoder().encode(opts.body),
            query: new URLSearchParams(search)
          }, options2, {
            fetched: url,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
          }
          if (typeof request.host !== "undefined") {
            const { hostname: fetch_hostname } = new URL(url);
            const [server_hostname] = request.host.split(":");
            if (`.${fetch_hostname}`.endsWith(`.${server_hostname}`) && opts.credentials !== "omit") {
              uses_credentials = true;
              opts.headers = {
                ...opts.headers,
                cookie: request.headers.cookie
              };
            }
          }
          const external_request = new Request(url, opts);
          response = await options2.hooks.externalFetch.call(null, external_request);
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, _receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 === "set-cookie") {
                    set_cookie_headers = set_cookie_headers.concat(value);
                  } else if (key2 !== "etag") {
                    headers[key2] = value;
                  }
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s2(response2.statusText)},"headers":${s2(headers)},"body":"${escape_json_string_in_html(body)}"}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      stuff: { ...stuff }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  if (!loaded) {
    throw new Error(`${node.entry} - load must return a value except for page fall through`);
  }
  return {
    node,
    loaded: normalize(loaded),
    stuff: loaded.stuff || stuff,
    fetched,
    set_cookie_headers,
    uses_credentials
  };
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error2 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    stuff: {},
    prerender_enabled: is_prerender_enabled(options2, default_error, state),
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      stuff: loaded ? loaded.stuff : {},
      prerender_enabled: is_prerender_enabled(options2, default_error, state),
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error2,
      branch,
      page
    });
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
function is_prerender_enabled(options2, node, state) {
  return options2.prerender && (!!node.module.prerender || !!state.prerender && state.prerender.all);
}
async function respond$1(opts) {
  const { request, options: options2, state, $session, route } = opts;
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id ? options2.load_component(id) : void 0));
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options2);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {}
    };
  }
  let branch = [];
  let status = 200;
  let error2;
  let set_cookie_headers = [];
  ssr:
    if (page_config.ssr) {
      let stuff = {};
      for (let i2 = 0; i2 < nodes.length; i2 += 1) {
        const node = nodes[i2];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              ...opts,
              node,
              stuff,
              prerender_enabled: is_prerender_enabled(options2, node, state),
              is_leaf: i2 === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            set_cookie_headers = set_cookie_headers.concat(loaded.set_cookie_headers);
            if (loaded.loaded.redirect) {
              return with_cookies({
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              }, set_cookie_headers);
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (err) {
            const e2 = coalesce_to_error(err);
            options2.handle_error(e2, request);
            status = 500;
            error2 = e2;
          }
          if (loaded && !error2) {
            branch.push(loaded);
          }
          if (error2) {
            while (i2--) {
              if (route.b[i2]) {
                const error_node = await options2.load_component(route.b[i2]);
                let node_loaded;
                let j = i2;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node({
                    ...opts,
                    node: error_node,
                    stuff: node_loaded.stuff,
                    prerender_enabled: is_prerender_enabled(options2, error_node, state),
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options2);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (err) {
                  const e2 = coalesce_to_error(err);
                  options2.handle_error(e2, request);
                  continue;
                }
              }
            }
            return with_cookies(await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error2
            }), set_cookie_headers);
          }
        }
        if (loaded && loaded.loaded.stuff) {
          stuff = {
            ...stuff,
            ...loaded.loaded.stuff
          };
        }
      }
    }
  try {
    return with_cookies(await render_response({
      ...opts,
      page_config,
      status,
      error: error2,
      branch: branch.filter(Boolean)
    }), set_cookie_headers);
  } catch (err) {
    const error3 = coalesce_to_error(err);
    options2.handle_error(error3, request);
    return with_cookies(await respond_with_error({
      ...opts,
      status: 500,
      error: error3
    }), set_cookie_headers);
  }
}
function get_page_config(leaf, options2) {
  return {
    ssr: "ssr" in leaf ? !!leaf.ssr : options2.ssr,
    router: "router" in leaf ? !!leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options2.hydrate
  };
}
function with_cookies(response, set_cookie_headers) {
  if (set_cookie_headers.length) {
    response.headers["set-cookie"] = set_cookie_headers;
  }
  return response;
}
async function render_page(request, route, match, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  const $session = await options2.hooks.getSession(request);
  const response = await respond$1({
    request,
    options: options2,
    state,
    $session,
    route,
    page
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        (map.get(key) || []).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const content_type = headers["content-type"];
  const [type, ...directives] = content_type ? content_type.split(/;\s*/) : [];
  const text = () => new TextDecoder(headers["content-encoding"] || "utf-8").decode(raw);
  switch (type) {
    case "text/plain":
      return text();
    case "application/json":
      return JSON.parse(text());
    case "application/x-www-form-urlencoded":
      return get_urlencoded(text());
    case "multipart/form-data": {
      const boundary = directives.find((directive) => directive.startsWith("boundary="));
      if (!boundary)
        throw new Error("Missing boundary");
      return get_multipart(text(), boundary.slice("boundary=".length));
    }
    default:
      return raw;
  }
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    const headers = {};
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      headers[name] = value;
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !(incoming.path.split("/").pop() || "").includes(".")) {
      const path2 = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: options2.paths.base + path2 + (q ? `?${q}` : "")
        }
      };
    }
  }
  const headers = lowercase_keys(incoming.headers);
  const request = {
    ...incoming,
    headers,
    body: parse_body(incoming.rawBody, headers),
    params: {},
    locals: {}
  };
  try {
    return await options2.hooks.handle({
      request,
      resolve: async (request2) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request2),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            branch: []
          });
        }
        const decoded = decodeURI(request2.path);
        for (const route of options2.manifest.routes) {
          const match = route.pattern.exec(decoded);
          if (!match)
            continue;
          const response = route.type === "endpoint" ? await render_endpoint(request2, route, match) : await render_page(request2, route, match, options2, state);
          if (response) {
            if (response.status === 200) {
              const cache_control = get_single_valued_header(response.headers, "cache-control");
              if (!cache_control || !/(no-store|immutable)/.test(cache_control)) {
                let if_none_match_value = request2.headers["if-none-match"];
                if (if_none_match_value?.startsWith('W/"')) {
                  if_none_match_value = if_none_match_value.substring(2);
                }
                const etag = `"${hash(response.body || "")}"`;
                if (if_none_match_value === etag) {
                  return {
                    status: 304,
                    headers: {}
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        const $session = await options2.hooks.getSession(request2);
        return await respond_with_error({
          request: request2,
          options: options2,
          state,
          $session,
          status: 404,
          error: new Error(`Not found: ${request2.path}`)
        });
      }
    });
  } catch (err) {
    const e2 = coalesce_to_error(err);
    options2.handle_error(e2, request);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e2.stack : e2.message
    };
  }
}
var chars, unsafeChars, reserved, escaped, objectProtoOwnPropertyNames, subscriber_queue, escape_json_string_in_html_dict, escape_html_attr_dict, s$1, s2, ReadOnlyFormData;
var init_ssr = __esm({
  "node_modules/@sveltejs/kit/dist/ssr.js"() {
    init_shims();
    init_url();
    init_error();
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
    unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
    reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
    escaped = {
      "<": "\\u003C",
      ">": "\\u003E",
      "/": "\\u002F",
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\0": "\\0",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
    Promise.resolve();
    subscriber_queue = [];
    escape_json_string_in_html_dict = {
      '"': '\\"',
      "<": "\\u003C",
      ">": "\\u003E",
      "/": "\\u002F",
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\0": "\\0",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    escape_html_attr_dict = {
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;"
    };
    s$1 = JSON.stringify;
    s2 = JSON.stringify;
    ReadOnlyFormData = class {
      #map;
      constructor(map) {
        this.#map = map;
      }
      get(key) {
        const value = this.#map.get(key);
        return value && value[0];
      }
      getAll(key) {
        return this.#map.get(key);
      }
      has(key) {
        return this.#map.has(key);
      }
      *[Symbol.iterator]() {
        for (const [key, value] of this.#map) {
          for (let i2 = 0; i2 < value.length; i2 += 1) {
            yield [key, value[i2]];
          }
        }
      }
      *entries() {
        for (const [key, value] of this.#map) {
          for (let i2 = 0; i2 < value.length; i2 += 1) {
            yield [key, value[i2]];
          }
        }
      }
      *keys() {
        for (const [key] of this.#map)
          yield key;
      }
      *values() {
        for (const [, value] of this.#map) {
          for (let i2 = 0; i2 < value.length; i2 += 1) {
            yield value[i2];
          }
        }
      }
    };
  }
});

// .svelte-kit/output/server/chunks/layout-dbc0ba01.js
var layout_dbc0ba01_exports = {};
__export(layout_dbc0ba01_exports, {
  default: () => Layout
});
var Layout;
var init_layout_dbc0ba01 = __esm({
  ".svelte-kit/output/server/chunks/layout-dbc0ba01.js"() {
    init_shims();
    init_app_825f3e98();
    init_ssr();
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/chunks/error-a32701e1.js
var error_a32701e1_exports = {};
__export(error_a32701e1_exports, {
  default: () => Error2,
  load: () => load
});
function load({ error: error2, status }) {
  return { props: { error: error2, status } };
}
var Error2;
var init_error_a32701e1 = __esm({
  ".svelte-kit/output/server/chunks/error-a32701e1.js"() {
    init_shims();
    init_app_825f3e98();
    init_ssr();
    Error2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { status } = $$props;
      let { error: error2 } = $$props;
      if ($$props.status === void 0 && $$bindings.status && status !== void 0)
        $$bindings.status(status);
      if ($$props.error === void 0 && $$bindings.error && error2 !== void 0)
        $$bindings.error(error2);
      return `<h1>${escape2(status)}</h1>

<pre>${escape2(error2.message)}</pre>



${error2.frame ? `<pre>${escape2(error2.frame)}</pre>` : ``}
${error2.stack ? `<pre>${escape2(error2.stack)}</pre>` : ``}`;
    });
  }
});

// node_modules/gun/gun.js
var require_gun = __commonJS({
  "node_modules/gun/gun.js"(exports, module2) {
    init_shims();
    (function() {
      function USE(arg, req) {
        return req ? require(arg) : arg.slice ? USE[R(arg)] : function(mod, path2) {
          arg(mod = { exports: {} });
          USE[R(path2)] = mod.exports;
        };
        function R(p) {
          return p.split("/").slice(-1).toString().replace(".js", "");
        }
      }
      if (typeof module2 !== "undefined") {
        var MODULE = module2;
      }
      ;
      USE(function(module3) {
        String.random = function(l, c) {
          var s3 = "";
          l = l || 24;
          c = c || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxyz";
          while (l-- > 0) {
            s3 += c.charAt(Math.floor(Math.random() * c.length));
          }
          return s3;
        };
        String.match = function(t2, o) {
          var tmp, u;
          if (typeof t2 !== "string") {
            return false;
          }
          if (typeof o == "string") {
            o = { "=": o };
          }
          o = o || {};
          tmp = o["="] || o["*"] || o[">"] || o["<"];
          if (t2 === tmp) {
            return true;
          }
          if (u !== o["="]) {
            return false;
          }
          tmp = o["*"] || o[">"];
          if (t2.slice(0, (tmp || "").length) === tmp) {
            return true;
          }
          if (u !== o["*"]) {
            return false;
          }
          if (u !== o[">"] && u !== o["<"]) {
            return t2 >= o[">"] && t2 <= o["<"] ? true : false;
          }
          if (u !== o[">"] && t2 >= o[">"]) {
            return true;
          }
          if (u !== o["<"] && t2 <= o["<"]) {
            return true;
          }
          return false;
        };
        String.hash = function(s3, c) {
          if (typeof s3 !== "string") {
            return;
          }
          c = c || 0;
          if (!s3.length) {
            return c;
          }
          for (var i2 = 0, l = s3.length, n; i2 < l; ++i2) {
            n = s3.charCodeAt(i2);
            c = (c << 5) - c + n;
            c |= 0;
          }
          return c;
        };
        var has = Object.prototype.hasOwnProperty;
        Object.plain = function(o) {
          return o ? o instanceof Object && o.constructor === Object || Object.prototype.toString.call(o).match(/^\[object (\w+)\]$/)[1] === "Object" : false;
        };
        Object.empty = function(o, n) {
          for (var k in o) {
            if (has.call(o, k) && (!n || n.indexOf(k) == -1)) {
              return false;
            }
          }
          return true;
        };
        Object.keys = Object.keys || function(o) {
          var l = [];
          for (var k in o) {
            if (has.call(o, k)) {
              l.push(k);
            }
          }
          return l;
        };
        (function() {
          var u, sT = setTimeout, l = 0, c = 0, sI = typeof setImmediate !== "" + u && setImmediate || sT;
          sT.poll = sT.poll || function(f3) {
            if (1 >= +new Date() - l && c++ < 3333) {
              f3();
              return;
            }
            sI(function() {
              l = +new Date();
              f3();
            }, c = 0);
          };
        })();
        ;
        (function() {
          var sT = setTimeout, t2 = sT.turn = sT.turn || function(f4) {
            s3.push(f4) == 1 && p(T);
          }, s3 = t2.s = [], p = sT.poll, i2 = 0, f3, T = function() {
            if (f3 = s3[i2++]) {
              f3();
            }
            if (i2 == s3.length || i2 == 99) {
              s3 = t2.s = s3.slice(i2);
              i2 = 0;
            }
            if (s3.length) {
              p(T);
            }
          };
        })();
        ;
        (function() {
          var u, sT = setTimeout, T = sT.turn;
          (sT.each = sT.each || function(l, f3, e2, S2) {
            S2 = S2 || 9;
            (function t2(s3, L, r2) {
              if (L = (s3 = (l || []).splice(0, S2)).length) {
                for (var i2 = 0; i2 < L; i2++) {
                  if (u !== (r2 = f3(s3[i2]))) {
                    break;
                  }
                }
                if (u === r2) {
                  T(t2);
                  return;
                }
              }
              e2 && e2(r2);
            })();
          })();
        })();
      })(USE, "./shim");
      ;
      USE(function(module3) {
        module3.exports = function onto(tag, arg, as) {
          if (!tag) {
            return { to: onto };
          }
          var u, f3 = typeof arg == "function", tag = (this.tag || (this.tag = {}))[tag] || f3 && (this.tag[tag] = { tag, to: onto._ = { next: function(arg2) {
            var tmp;
            if (tmp = this.to) {
              tmp.next(arg2);
            }
          } } });
          if (f3) {
            var be = {
              off: onto.off || (onto.off = function() {
                if (this.next === onto._.next) {
                  return true;
                }
                if (this === this.the.last) {
                  this.the.last = this.back;
                }
                this.to.back = this.back;
                this.next = onto._.next;
                this.back.to = this.to;
                if (this.the.last === this.the) {
                  delete this.on.tag[this.the.tag];
                }
              }),
              to: onto._,
              next: arg,
              the: tag,
              on: this,
              as
            };
            (be.back = tag.last || tag).to = be;
            return tag.last = be;
          }
          if ((tag = tag.to) && u !== arg) {
            tag.next(arg);
          }
          return tag;
        };
      })(USE, "./onto");
      ;
      USE(function(module3) {
        USE("./shim");
        module3.exports = function(v) {
          if (v === void 0) {
            return false;
          }
          if (v === null) {
            return true;
          }
          if (v === Infinity) {
            return false;
          }
          if (v !== v) {
            return false;
          }
          if (typeof v == "string" || typeof v == "boolean" || typeof v == "number") {
            return true;
          }
          if (v && typeof (v["#"] || 0) == "string" && Object.empty(v, ["#"])) {
            return v["#"];
          }
          return false;
        };
      })(USE, "./valid");
      ;
      USE(function(module3) {
        USE("./shim");
        function State() {
          var t2 = +new Date();
          if (last < t2) {
            return N = 0, last = t2 + State.drift;
          }
          return last = t2 + (N += 1) / D + State.drift;
        }
        State.drift = 0;
        var NI = -Infinity, N = 0, D = 999, last = NI, u;
        State.is = function(n, k, o) {
          var tmp = k && n && n._ && n._[">"] || o;
          if (!tmp) {
            return;
          }
          return typeof (tmp = tmp[k]) == "number" ? tmp : NI;
        };
        State.ify = function(n, k, s3, v, soul) {
          (n = n || {})._ = n._ || {};
          if (soul) {
            n._["#"] = soul;
          }
          var tmp = n._[">"] || (n._[">"] = {});
          if (u !== k && k !== "_") {
            if (typeof s3 == "number") {
              tmp[k] = s3;
            }
            if (u !== v) {
              n[k] = v;
            }
          }
          return n;
        };
        module3.exports = State;
      })(USE, "./state");
      ;
      USE(function(module3) {
        USE("./shim");
        function Dup(opt) {
          var dup = { s: {} }, s3 = dup.s;
          opt = opt || { max: 999, age: 1e3 * 9 };
          dup.check = function(id) {
            if (!s3[id]) {
              return false;
            }
            return dt(id);
          };
          var dt = dup.track = function(id) {
            var it = s3[id] || (s3[id] = {});
            it.was = dup.now = +new Date();
            if (!dup.to) {
              dup.to = setTimeout(dup.drop, opt.age + 9);
            }
            return it;
          };
          dup.drop = function(age) {
            dup.to = null;
            dup.now = +new Date();
            var l = Object.keys(s3);
            console.STAT && console.STAT(dup.now, +new Date() - dup.now, "dup drop keys");
            setTimeout.each(l, function(id) {
              var it = s3[id];
              if (it && (age || opt.age) > dup.now - it.was) {
                return;
              }
              delete s3[id];
            }, 0, 99);
          };
          return dup;
        }
        module3.exports = Dup;
      })(USE, "./dup");
      ;
      USE(function(module3) {
        USE("./onto");
        module3.exports = function ask(cb, as) {
          if (!this.on) {
            return;
          }
          var lack = (this.opt || {}).lack || 9e3;
          if (!(typeof cb == "function")) {
            if (!cb) {
              return;
            }
            var id = cb["#"] || cb, tmp = (this.tag || "")[id];
            if (!tmp) {
              return;
            }
            if (as) {
              tmp = this.on(id, as);
              clearTimeout(tmp.err);
              tmp.err = setTimeout(function() {
                tmp.off();
              }, lack);
            }
            return true;
          }
          var id = as && as["#"] || random(9);
          if (!cb) {
            return id;
          }
          var to = this.on(id, cb, as);
          to.err = to.err || setTimeout(function() {
            to.off();
            to.next({ err: "Error: No ACK yet.", lack: true });
          }, lack);
          return id;
        };
        var random = String.random || function() {
          return Math.random().toString(36).slice(2);
        };
      })(USE, "./ask");
      ;
      USE(function(module3) {
        function Gun3(o) {
          if (o instanceof Gun3) {
            return (this._ = { $: this }).$;
          }
          if (!(this instanceof Gun3)) {
            return new Gun3(o);
          }
          return Gun3.create(this._ = { $: this, opt: o });
        }
        Gun3.is = function($) {
          return $ instanceof Gun3 || $ && $._ && $ === $._.$ || false;
        };
        Gun3.version = 0.202;
        Gun3.chain = Gun3.prototype;
        Gun3.chain.toJSON = function() {
        };
        USE("./shim");
        Gun3.valid = USE("./valid");
        Gun3.state = USE("./state");
        Gun3.on = USE("./onto");
        Gun3.dup = USE("./dup");
        Gun3.ask = USE("./ask");
        ;
        (function() {
          Gun3.create = function(at) {
            at.root = at.root || at;
            at.graph = at.graph || {};
            at.on = at.on || Gun3.on;
            at.ask = at.ask || Gun3.ask;
            at.dup = at.dup || Gun3.dup();
            var gun = at.$.opt(at.opt);
            if (!at.once) {
              at.on("in", universe, at);
              at.on("out", universe, at);
              at.on("put", map, at);
              Gun3.on("create", at);
              at.on("create", at);
            }
            at.once = 1;
            return gun;
          };
          function universe(msg) {
            if (!msg) {
              return;
            }
            if (msg.out === universe) {
              this.to.next(msg);
              return;
            }
            var eve = this, as = eve.as, at = as.at || as, gun = at.$, dup = at.dup, tmp, DBG = msg.DBG;
            (tmp = msg["#"]) || (tmp = msg["#"] = text_rand(9));
            if (dup.check(tmp)) {
              return;
            }
            dup.track(tmp);
            tmp = msg._;
            msg._ = typeof tmp == "function" ? tmp : function() {
            };
            msg.$ && msg.$ === (msg.$._ || "").$ || (msg.$ = gun);
            if (msg["@"] && !msg.put) {
              ack(msg);
            }
            if (!at.ask(msg["@"], msg)) {
              DBG && (DBG.u = +new Date());
              if (msg.put) {
                put(msg);
                return;
              } else if (msg.get) {
                Gun3.on.get(msg, gun);
              }
            }
            DBG && (DBG.uc = +new Date());
            eve.to.next(msg);
            DBG && (DBG.ua = +new Date());
            if (msg.nts || msg.NTS) {
              return;
            }
            msg.out = universe;
            at.on("out", msg);
            DBG && (DBG.ue = +new Date());
          }
          function put(msg) {
            if (!msg) {
              return;
            }
            var ctx = msg._ || "", root = ctx.root = ((ctx.$ = msg.$ || "")._ || "").root;
            if (msg["@"] && ctx.faith && !ctx.miss) {
              msg.out = universe;
              root.on("out", msg);
              return;
            }
            ctx.latch = root.hatch;
            ctx.match = root.hatch = [];
            var put2 = msg.put;
            var DBG = ctx.DBG = msg.DBG, S2 = +new Date();
            if (put2["#"] && put2["."]) {
              return;
            }
            DBG && (DBG.p = S2);
            ctx["#"] = msg["#"];
            ctx.msg = msg;
            ctx.all = 0;
            ctx.stun = 1;
            var nl = Object.keys(put2);
            console.STAT && console.STAT(S2, ((DBG || ctx).pk = +new Date()) - S2, "put sort");
            var ni = 0, nj, kl, soul, node, states, err, tmp;
            (function pop(o) {
              if (nj != ni) {
                nj = ni;
                if (!(soul = nl[ni])) {
                  console.STAT && console.STAT(S2, ((DBG || ctx).pd = +new Date()) - S2, "put");
                  fire(ctx);
                  return;
                }
                if (!(node = put2[soul])) {
                  err = ERR + cut(soul) + "no node.";
                } else if (!(tmp = node._)) {
                  err = ERR + cut(soul) + "no meta.";
                } else if (soul !== tmp["#"]) {
                  err = ERR + cut(soul) + "soul not same.";
                } else if (!(states = tmp[">"])) {
                  err = ERR + cut(soul) + "no state.";
                }
                kl = Object.keys(node || {});
              }
              if (err) {
                msg.err = ctx.err = err;
                fire(ctx);
                return;
              }
              var i2 = 0, key;
              o = o || 0;
              while (o++ < 9 && (key = kl[i2++])) {
                if (key === "_") {
                  continue;
                }
                var val = node[key], state = states[key];
                if (u === state) {
                  err = ERR + cut(key) + "on" + cut(soul) + "no state.";
                  break;
                }
                if (!valid(val)) {
                  err = ERR + cut(key) + "on" + cut(soul) + "bad " + typeof val + cut(val);
                  break;
                }
                ham(val, key, soul, state, msg);
              }
              if ((kl = kl.slice(i2)).length) {
                turn(pop);
                return;
              }
              ++ni;
              kl = null;
              pop(o);
            })();
          }
          Gun3.on.put = put;
          function ham(val, key, soul, state, msg) {
            var ctx = msg._ || "", root = ctx.root, graph = root.graph, lot, tmp;
            var vertex = graph[soul] || empty2, was = state_is(vertex, key, 1), known = vertex[key];
            var DBG = ctx.DBG;
            if (tmp = console.STAT) {
              if (!graph[soul] || !known) {
                tmp.has = (tmp.has || 0) + 1;
              }
            }
            var now = State(), u2;
            if (state > now) {
              setTimeout(function() {
                ham(val, key, soul, state, msg);
              }, (tmp = state - now) > MD ? MD : tmp);
              console.STAT && console.STAT((DBG || ctx).Hf = +new Date(), tmp, "future");
              return;
            }
            if (state < was) {
              if (!ctx.miss) {
                return;
              }
            }
            if (!ctx.faith) {
              if (state === was && (val === known || L(val) <= L(known))) {
                if (!ctx.miss) {
                  return;
                }
              }
            }
            ctx.stun++;
            var aid = msg["#"] + ctx.all++, id = { toString: function() {
              return aid;
            }, _: ctx };
            id.toJSON = id.toString;
            DBG && (DBG.ph = DBG.ph || +new Date());
            root.on("put", { "#": id, "@": msg["@"], put: { "#": soul, ".": key, ":": val, ">": state }, _: ctx });
          }
          function map(msg) {
            var DBG;
            if (DBG = (msg._ || "").DBG) {
              DBG.pa = +new Date();
              DBG.pm = DBG.pm || +new Date();
            }
            var eve = this, root = eve.as, graph = root.graph, ctx = msg._, put2 = msg.put, soul = put2["#"], key = put2["."], val = put2[":"], state = put2[">"], id = msg["#"], tmp;
            if ((tmp = ctx.msg) && (tmp = tmp.put) && (tmp = tmp[soul])) {
              state_ify(tmp, key, state, val, soul);
            }
            graph[soul] = state_ify(graph[soul], key, state, val, soul);
            if (tmp = (root.next || "")[soul]) {
              tmp.on("in", msg);
            }
            fire(ctx);
            eve.to.next(msg);
          }
          function fire(ctx, msg) {
            var root;
            if (ctx.stop) {
              return;
            }
            if (!ctx.err && 0 < --ctx.stun) {
              return;
            }
            ctx.stop = 1;
            if (!(root = ctx.root)) {
              return;
            }
            var tmp = ctx.match;
            tmp.end = 1;
            if (tmp === root.hatch) {
              if (!(tmp = ctx.latch) || tmp.end) {
                delete root.hatch;
              } else {
                root.hatch = tmp;
              }
            }
            ctx.hatch && ctx.hatch();
            setTimeout.each(ctx.match, function(cb) {
              cb && cb();
            });
            if (!(msg = ctx.msg) || ctx.err || msg.err) {
              return;
            }
            msg.out = universe;
            ctx.root.on("out", msg);
          }
          function ack(msg) {
            var id = msg["@"] || "", ctx;
            if (!(ctx = id._)) {
              return;
            }
            ctx.acks = (ctx.acks || 0) + 1;
            if (ctx.err = msg.err) {
              msg["@"] = ctx["#"];
              fire(ctx);
            }
            if (!ctx.stop && !ctx.crack) {
              ctx.crack = ctx.match && ctx.match.push(function() {
                back(ctx);
              });
            }
            back(ctx);
          }
          function back(ctx) {
            if (!ctx || !ctx.root) {
              return;
            }
            if (ctx.stun || ctx.acks !== ctx.all) {
              return;
            }
            ctx.root.on("in", { "@": ctx["#"], err: ctx.err, ok: ctx.err ? u : { "": 1 } });
          }
          var ERR = "Error: Invalid graph!";
          var cut = function(s3) {
            return " '" + ("" + s3).slice(0, 9) + "...' ";
          };
          var L = JSON.stringify, MD = 2147483647, State = Gun3.state;
        })();
        ;
        (function() {
          Gun3.on.get = function(msg, gun) {
            var root = gun._, get = msg.get, soul = get["#"], node = root.graph[soul], has = get["."];
            var next = root.next || (root.next = {}), at = next[soul];
            var ctx = msg._ || {}, DBG = ctx.DBG = msg.DBG;
            DBG && (DBG.g = +new Date());
            if (!node) {
              return root.on("get", msg);
            }
            if (has) {
              if (typeof has != "string" || u === node[has]) {
                return root.on("get", msg);
              }
              node = state_ify({}, has, state_is(node, has), node[has], soul);
            }
            node && ack(msg, node);
            root.on("get", msg);
          };
          function ack(msg, node) {
            var S2 = +new Date(), ctx = msg._ || {}, DBG = ctx.DBG = msg.DBG;
            var to = msg["#"], id = text_rand(9), keys = Object.keys(node || "").sort(), soul = ((node || "")._ || "")["#"], kl = keys.length, j = 0, root = msg.$._.root, F2 = node === root.graph[soul];
            console.STAT && console.STAT(S2, ((DBG || ctx).gk = +new Date()) - S2, "got keys");
            node && function go() {
              S2 = +new Date();
              var i2 = 0, k, put = {}, tmp;
              while (i2 < 9 && (k = keys[i2++])) {
                state_ify(put, k, state_is(node, k), node[k], soul);
              }
              keys = keys.slice(i2);
              (tmp = {})[soul] = put;
              put = tmp;
              var faith;
              if (F2) {
                faith = function() {
                };
                faith.ram = faith.faith = true;
              }
              tmp = keys.length;
              console.STAT && console.STAT(S2, -(S2 - (S2 = +new Date())), "got copied some");
              DBG && (DBG.ga = +new Date());
              root.on("in", { "@": to, "#": id, put, "%": tmp ? id = text_rand(9) : u, $: root.$, _: faith, DBG });
              console.STAT && console.STAT(S2, +new Date() - S2, "got in");
              if (!tmp) {
                return;
              }
              setTimeout.turn(go);
            }();
            if (!node) {
              root.on("in", { "@": msg["#"] });
            }
          }
          Gun3.on.get.ack = ack;
        })();
        ;
        (function() {
          Gun3.chain.opt = function(opt) {
            opt = opt || {};
            var gun = this, at = gun._, tmp = opt.peers || opt;
            if (!Object.plain(opt)) {
              opt = {};
            }
            if (!Object.plain(at.opt)) {
              at.opt = opt;
            }
            if (typeof tmp == "string") {
              tmp = [tmp];
            }
            if (tmp instanceof Array) {
              if (!Object.plain(at.opt.peers)) {
                at.opt.peers = {};
              }
              tmp.forEach(function(url) {
                var p = {};
                p.id = p.url = url;
                at.opt.peers[url] = at.opt.peers[url] || p;
              });
            }
            at.opt.peers = at.opt.peers || {};
            obj_each(opt, function each2(k) {
              var v = this[k];
              if (this && this.hasOwnProperty(k) || typeof v == "string" || Object.empty(v)) {
                this[k] = v;
                return;
              }
              if (v && v.constructor !== Object && !(v instanceof Array)) {
                return;
              }
              obj_each(v, each2);
            });
            Gun3.on("opt", at);
            at.opt.uuid = at.opt.uuid || function uuid(l) {
              return Gun3.state().toString(36).replace(".", "") + String.random(l || 12);
            };
            return gun;
          };
        })();
        var obj_each = function(o, f3) {
          Object.keys(o).forEach(f3, o);
        }, text_rand = String.random, turn = setTimeout.turn, valid = Gun3.valid, state_is = Gun3.state.is, state_ify = Gun3.state.ify, u, empty2 = {}, C;
        Gun3.log = function() {
          return !Gun3.log.off && C.log.apply(C, arguments), [].slice.call(arguments).join(" ");
        };
        Gun3.log.once = function(w, s3, o) {
          return (o = Gun3.log.once)[w] = o[w] || 0, o[w]++ || Gun3.log(s3);
        };
        if (typeof window !== "undefined") {
          (window.GUN = window.Gun = Gun3).window = window;
        }
        try {
          if (typeof MODULE !== "undefined") {
            MODULE.exports = Gun3;
          }
        } catch (e2) {
        }
        module3.exports = Gun3;
        (Gun3.window || {}).console = (Gun3.window || {}).console || { log: function() {
        } };
        (C = console).only = function(i2, s3) {
          return C.only.i && i2 === C.only.i && C.only.i++ && (C.log.apply(C, arguments) || s3);
        };
        ;
        "Please do not remove welcome log unless you are paying for a monthly sponsorship, thanks!";
        Gun3.log.once("welcome", "Hello wonderful person! :) Thanks for using GUN, please ask for help on http://chat.gun.eco if anything takes you longer than 5min to figure out!");
      })(USE, "./root");
      ;
      USE(function(module3) {
        var Gun3 = USE("./root");
        Gun3.chain.back = function(n, opt) {
          var tmp;
          n = n || 1;
          if (n === -1 || n === Infinity) {
            return this._.root.$;
          } else if (n === 1) {
            return (this._.back || this._).$;
          }
          var gun = this, at = gun._;
          if (typeof n === "string") {
            n = n.split(".");
          }
          if (n instanceof Array) {
            var i2 = 0, l = n.length, tmp = at;
            for (i2; i2 < l; i2++) {
              tmp = (tmp || empty2)[n[i2]];
            }
            if (u !== tmp) {
              return opt ? gun : tmp;
            } else if (tmp = at.back) {
              return tmp.$.back(n, opt);
            }
            return;
          }
          if (typeof n == "function") {
            var yes, tmp = { back: at };
            while ((tmp = tmp.back) && u === (yes = n(tmp, opt))) {
            }
            return yes;
          }
          if (typeof n == "number") {
            return (at.back || at).$.back(n - 1);
          }
          return this;
        };
        var empty2 = {}, u;
      })(USE, "./back");
      ;
      USE(function(module3) {
        var Gun3 = USE("./root");
        Gun3.chain.chain = function(sub) {
          var gun = this, at = gun._, chain = new (sub || gun).constructor(gun), cat = chain._, root;
          cat.root = root = at.root;
          cat.id = ++root.once;
          cat.back = gun._;
          cat.on = Gun3.on;
          cat.on("in", Gun3.on.in, cat);
          cat.on("out", Gun3.on.out, cat);
          return chain;
        };
        function output(msg) {
          var put, get, at = this.as, back = at.back, root = at.root, tmp;
          if (!msg.$) {
            msg.$ = at.$;
          }
          this.to.next(msg);
          if (at.err) {
            at.on("in", { put: at.put = u, $: at.$ });
            return;
          }
          if (get = msg.get) {
            if (root.pass) {
              root.pass[at.id] = at;
            }
            if (at.lex) {
              Object.keys(at.lex).forEach(function(k) {
                tmp[k] = at.lex[k];
              }, tmp = msg.get = msg.get || {});
            }
            if (get["#"] || at.soul) {
              get["#"] = get["#"] || at.soul;
              msg["#"] || (msg["#"] = text_rand(9));
              back = root.$.get(get["#"])._;
              if (!(get = get["."])) {
                tmp = back.ask && back.ask[""];
                (back.ask || (back.ask = {}))[""] = back;
                if (u !== back.put) {
                  back.on("in", back);
                  if (tmp) {
                    return;
                  }
                }
                msg.$ = back.$;
              } else if (obj_has(back.put, get)) {
                tmp = back.ask && back.ask[get];
                (back.ask || (back.ask = {}))[get] = back.$.get(get)._;
                back.on("in", { get, put: { "#": back.soul, ".": get, ":": back.put[get], ">": state_is(root.graph[back.soul], get) } });
                if (tmp) {
                  return;
                }
              }
              root.ask(ack, msg);
              return root.on("in", msg);
            }
            if (get["."]) {
              if (at.get) {
                msg = { get: { ".": at.get }, $: at.$ };
                (back.ask || (back.ask = {}))[at.get] = msg.$._;
                return back.on("out", msg);
              }
              msg = { get: at.lex ? msg.get : {}, $: at.$ };
              return back.on("out", msg);
            }
            (at.ask || (at.ask = {}))[""] = at;
            if (at.get) {
              get["."] = at.get;
              (back.ask || (back.ask = {}))[at.get] = msg.$._;
              return back.on("out", msg);
            }
          }
          return back.on("out", msg);
        }
        ;
        Gun3.on.out = output;
        function input(msg, cat) {
          cat = cat || this.as;
          var root = cat.root, gun = msg.$ || (msg.$ = cat.$), at = (gun || "")._ || empty2, tmp = msg.put || "", soul = tmp["#"], key = tmp["."], change = u !== tmp["="] ? tmp["="] : tmp[":"], state2 = tmp[">"] || -Infinity, sat;
          if (u !== msg.put && (u === tmp["#"] || u === tmp["."] || u === tmp[":"] && u === tmp["="] || u === tmp[">"])) {
            if (!valid(tmp)) {
              if (!(soul = ((tmp || "")._ || "")["#"])) {
                console.log("chain not yet supported for", tmp, "...", msg, cat);
                return;
              }
              gun = cat.root.$.get(soul);
              return setTimeout.each(Object.keys(tmp).sort(), function(k) {
                if (k == "_" || u === (state2 = state_is(tmp, k))) {
                  return;
                }
                cat.on("in", { $: gun, put: { "#": soul, ".": k, "=": tmp[k], ">": state2 }, VIA: msg });
              });
            }
            cat.on("in", { $: at.back.$, put: { "#": soul = at.back.soul, ".": key = at.has || at.get, "=": tmp, ">": state_is(at.back.put, key) }, via: msg });
            return;
          }
          if ((msg.seen || "")[cat.id]) {
            return;
          }
          (msg.seen || (msg.seen = function() {
          }))[cat.id] = cat;
          if (cat !== at) {
            Object.keys(msg).forEach(function(k) {
              tmp[k] = msg[k];
            }, tmp = {});
            tmp.get = cat.get || tmp.get;
            if (!cat.soul && !cat.has) {
              tmp.$$$ = tmp.$$$ || cat.$;
            } else if (at.soul) {
              tmp.$ = cat.$;
              tmp.$$ = tmp.$$ || at.$;
            }
            msg = tmp;
          }
          unlink(msg, cat);
          if ((cat.soul || msg.$$) && state2 >= state_is(root.graph[soul], key)) {
            (tmp = root.$.get(soul)._).put = state_ify(tmp.put, key, state2, change, soul);
          }
          if (!at.soul && state2 >= state_is(root.graph[soul], key) && (sat = (root.$.get(soul)._.next || "")[key])) {
            sat.put = change;
            if (typeof (tmp = valid(change)) == "string") {
              sat.put = root.$.get(tmp)._.put || change;
            }
          }
          this.to && this.to.next(msg);
          cat.any && setTimeout.each(Object.keys(cat.any), function(any) {
            (any = cat.any[any]) && any(msg);
          }, 0, 99);
          cat.echo && setTimeout.each(Object.keys(cat.echo), function(lat) {
            (lat = cat.echo[lat]) && lat.on("in", msg);
          }, 0, 99);
          if (((msg.$$ || "")._ || at).soul) {
            if ((sat = cat.next) && (sat = sat[key])) {
              tmp = {};
              Object.keys(msg).forEach(function(k) {
                tmp[k] = msg[k];
              });
              tmp.$ = (msg.$$ || msg.$).get(tmp.get = key);
              delete tmp.$$;
              delete tmp.$$$;
              sat.on("in", tmp);
            }
          }
          link(msg, cat);
        }
        ;
        Gun3.on.in = input;
        function link(msg, cat) {
          cat = cat || this.as || msg.$._;
          if (msg.$$ && this !== Gun3.on) {
            return;
          }
          if (!msg.put || cat.soul) {
            return;
          }
          var put = msg.put || "", link2 = put["="] || put[":"], tmp;
          var root = cat.root, tat = root.$.get(put["#"]).get(put["."])._;
          if (typeof (link2 = valid(link2)) != "string") {
            if (this === Gun3.on) {
              (tat.echo || (tat.echo = {}))[cat.id] = cat;
            }
            return;
          }
          if ((tat.echo || (tat.echo = {}))[cat.id] && !(root.pass || "")[cat.id]) {
            return;
          }
          if (tmp = root.pass) {
            if (tmp[link2 + cat.id]) {
              return;
            }
            tmp[link2 + cat.id] = 1;
          }
          (tat.echo || (tat.echo = {}))[cat.id] = cat;
          if (cat.has) {
            cat.link = link2;
          }
          var sat = root.$.get(tat.link = link2)._;
          (sat.echo || (sat.echo = {}))[tat.id] = tat;
          var tmp = cat.ask || "";
          if (tmp[""] || cat.lex) {
            sat.on("out", { get: { "#": link2 } });
          }
          setTimeout.each(Object.keys(tmp), function(get, sat2) {
            if (!get || !(sat2 = tmp[get])) {
              return;
            }
            sat2.on("out", { get: { "#": link2, ".": get } });
          }, 0, 99);
        }
        ;
        Gun3.on.link = link;
        function unlink(msg, cat) {
          var put = msg.put || "", change = u !== put["="] ? put["="] : put[":"], root = cat.root, link2, tmp;
          if (u === change) {
            if (cat.soul && u !== cat.put) {
              return;
            }
            tmp = (msg.$$ || msg.$ || "")._ || "";
            if (msg["@"] && (u !== tmp.put || u !== cat.put)) {
              return;
            }
            if (link2 = cat.link || msg.linked) {
              delete (root.$.get(link2)._.echo || "")[cat.id];
            }
            if (cat.has) {
              cat.link = null;
            }
            cat.put = u;
            setTimeout.each(Object.keys(cat.next || ""), function(get, sat) {
              if (!(sat = cat.next[get])) {
                return;
              }
              if (link2) {
                delete (root.$.get(link2).get(get)._.echo || "")[sat.id];
              }
              sat.on("in", { get, put: u, $: sat.$ });
            }, 0, 99);
            return;
          }
          if (cat.soul) {
            return;
          }
          if (msg.$$) {
            return;
          }
          link2 = valid(change);
          tmp = msg.$._ || "";
          if (link2 === tmp.link || cat.has && !tmp.link) {
            if ((root.pass || "")[cat.id] && typeof link2 !== "string") {
            } else {
              return;
            }
          }
          delete (tmp.echo || "")[cat.id];
          unlink({ get: cat.get, put: u, $: msg.$, linked: msg.linked = msg.linked || tmp.link }, cat);
        }
        ;
        Gun3.on.unlink = unlink;
        function ack(msg, ev) {
          var as = this.as, at = as.$._, root = at.root, get = as.get || "", tmp = (msg.put || "")[get["#"]] || "";
          if (!msg.put || typeof get["."] == "string" && u === tmp[get["."]]) {
            if (u !== at.put) {
              return;
            }
            if (!at.soul && !at.has) {
              return;
            }
            at.ack = (at.ack || 0) + 1;
            at.on("in", {
              get: at.get,
              put: at.put = u,
              $: at.$,
              "@": msg["@"]
            });
            return;
          }
          (msg._ || {}).miss = 1;
          Gun3.on.put(msg);
          return;
        }
        var empty2 = {}, u, text_rand = String.random, valid = Gun3.valid, obj_has = function(o, k) {
          return o && Object.prototype.hasOwnProperty.call(o, k);
        }, state = Gun3.state, state_is = state.is, state_ify = state.ify;
      })(USE, "./chain");
      ;
      USE(function(module3) {
        var Gun3 = USE("./root");
        Gun3.chain.get = function(key, cb, as) {
          var gun, tmp;
          if (typeof key === "string") {
            if (key.length == 0) {
              (gun = this.chain())._.err = { err: Gun3.log("0 length key!", key) };
              if (cb) {
                cb.call(gun, gun._.err);
              }
              return gun;
            }
            var back = this, cat = back._;
            var next = cat.next || empty2;
            if (!(gun = next[key])) {
              gun = key && cache(key, back);
            }
            gun = gun && gun.$;
          } else if (typeof key == "function") {
            let any2 = function(msg, eve, f3) {
              if (any2.stun) {
                return;
              }
              if ((tmp2 = root.pass) && !tmp2[id]) {
                return;
              }
              var at = msg.$._, sat = (msg.$$ || "")._, data = (sat || at).put, odd = !at.has && !at.soul, test = {}, link, tmp2;
              if (odd || u === data) {
                data = u === ((tmp2 = msg.put) || "")["="] ? u === (tmp2 || "")[":"] ? tmp2 : tmp2[":"] : tmp2["="];
              }
              if (link = typeof (tmp2 = Gun3.valid(data)) == "string") {
                data = u === (tmp2 = root.$.get(tmp2)._.put) ? opt.not ? u : data : tmp2;
              }
              if (opt.not && u === data) {
                return;
              }
              if (u === opt.stun) {
                if ((tmp2 = root.stun) && tmp2.on) {
                  cat.$.back(function(a) {
                    tmp2.on("" + a.id, test = {});
                    if ((test.run || 0) < any2.id) {
                      return test;
                    }
                  });
                  !test.run && tmp2.on("" + at.id, test = {});
                  !test.run && sat && tmp2.on("" + sat.id, test = {});
                  if (any2.id > test.run) {
                    if (!test.stun || test.stun.end) {
                      test.stun = tmp2.on("stun");
                      test.stun = test.stun && test.stun.last;
                    }
                    if (test.stun && !test.stun.end) {
                      (test.stun.add || (test.stun.add = {}))[id] = function() {
                        any2(msg, eve, 1);
                      };
                      return;
                    }
                  }
                }
                if (u === data) {
                  f3 = 0;
                }
                if ((tmp2 = root.hatch) && !tmp2.end && u === opt.hatch && !f3) {
                  if (wait[at.$._.id]) {
                    return;
                  }
                  wait[at.$._.id] = 1;
                  tmp2.push(function() {
                    any2(msg, eve, 1);
                  });
                  return;
                }
                ;
                wait = {};
              }
              if (root.pass) {
                if (root.pass[id + at.id]) {
                  return;
                }
                root.pass[id + at.id] = 1;
              }
              if (opt.on) {
                opt.ok.call(at.$, data, at.get, msg, eve || any2);
                return;
              }
              if (opt.v2020) {
                opt.ok(msg, eve || any2);
                return;
              }
              Object.keys(msg).forEach(function(k) {
                tmp2[k] = msg[k];
              }, tmp2 = {});
              msg = tmp2;
              msg.put = data;
              opt.ok.call(opt.as, msg, eve || any2);
            };
            var any = any2;
            if (cb === true) {
              return soul(this, key, cb, as), this;
            }
            gun = this;
            var cat = gun._, opt = cb || {}, root = cat.root, id;
            opt.at = cat;
            opt.ok = key;
            var wait = {};
            ;
            any2.at = cat;
            (cat.any || (cat.any = {}))[id = String.random(7)] = any2;
            any2.off = function() {
              any2.stun = 1;
              if (!cat.any) {
                return;
              }
              delete cat.any[id];
            };
            any2.rid = rid;
            any2.id = opt.run || ++root.once;
            tmp = root.pass;
            (root.pass = {})[id] = 1;
            opt.out = opt.out || { get: {} };
            cat.on("out", opt.out);
            root.pass = tmp;
            return gun;
          } else if (typeof key == "number") {
            return this.get("" + key, cb, as);
          } else if (typeof (tmp = valid(key)) == "string") {
            return this.get(tmp, cb, as);
          } else if (tmp = this.get.next) {
            gun = tmp(this, key);
          }
          if (!gun) {
            (gun = this.chain())._.err = { err: Gun3.log("Invalid get request!", key) };
            if (cb) {
              cb.call(gun, gun._.err);
            }
            return gun;
          }
          if (cb && typeof cb == "function") {
            gun.get(cb, as);
          }
          return gun;
        };
        function cache(key, back) {
          var cat = back._, next = cat.next, gun = back.chain(), at = gun._;
          if (!next) {
            next = cat.next = {};
          }
          next[at.get = key] = at;
          if (back === cat.root.$) {
            at.soul = key;
          } else if (cat.soul || cat.has) {
            at.has = key;
          }
          return at;
        }
        function soul(gun, cb, opt, as) {
          var cat = gun._, acks = 0, tmp;
          if (tmp = cat.soul || cat.link) {
            return cb(tmp, as, cat);
          }
          if (cat.jam) {
            return cat.jam.push([cb, as]);
          }
          cat.jam = [[cb, as]];
          gun.get(function go(msg, eve) {
            if (u === msg.put && !cat.root.opt.super && (tmp = Object.keys(cat.root.opt.peers).length) && ++acks <= tmp) {
              return;
            }
            eve.rid(msg);
            var at = (at = msg.$) && at._ || {}, i2 = 0, as2;
            tmp = cat.jam;
            delete cat.jam;
            while (as2 = tmp[i2++]) {
              var cb2 = as2[0], id;
              as2 = as2[1];
              cb2 && cb2(id = at.link || at.soul || Gun3.valid(msg.put) || ((msg.put || {})._ || {})["#"], as2, msg, eve);
            }
          }, { out: { get: { ".": true } } });
          return gun;
        }
        function rid(at) {
          var cat = this.at || this.on;
          if (!at || cat.soul || cat.has) {
            return this.off();
          }
          if (!(at = (at = (at = at.$ || at)._ || at).id)) {
            return;
          }
          var map = cat.map, tmp, seen;
          if (tmp = (seen = this.seen || (this.seen = {}))[at]) {
            return true;
          }
          seen[at] = true;
          return;
          return;
        }
        var empty2 = {}, valid = Gun3.valid, u;
      })(USE, "./get");
      ;
      USE(function(module3) {
        var Gun3 = USE("./root");
        Gun3.chain.put = function(data, cb, as) {
          var gun = this, at = gun._, root = at.root;
          as = as || {};
          as.root = at.root;
          as.run || (as.run = root.once);
          stun(as, at.id);
          as.ack = as.ack || cb;
          as.via = as.via || gun;
          as.data = as.data || data;
          as.soul || (as.soul = at.soul || typeof cb == "string" && cb);
          var s3 = as.state = as.state || Gun3.state();
          if (typeof data == "function") {
            data(function(d) {
              as.data = d;
              gun.put(u, u, as);
            });
            return gun;
          }
          if (!as.soul) {
            return get(as), gun;
          }
          as.$ = root.$.get(as.soul);
          as.todo = [{ it: as.data, ref: as.$ }];
          as.turn = as.turn || turn;
          as.ran = as.ran || ran;
          (function walk() {
            var to = as.todo, at2 = to.pop(), d = at2.it, cid = at2.ref && at2.ref._.id, v, k, cat, tmp, g;
            stun(as, at2.ref);
            if (tmp = at2.todo) {
              k = tmp.pop();
              d = d[k];
              if (tmp.length) {
                to.push(at2);
              }
            }
            k && (to.path || (to.path = [])).push(k);
            if (!(v = valid(d)) && !(g = Gun3.is(d))) {
              if (!Object.plain(d)) {
                (as.ack || noop4).call(as, as.out = { err: as.err = Gun3.log("Invalid data: " + (d && (tmp = d.constructor) && tmp.name || typeof d) + " at " + (as.via.back(function(at3) {
                  at3.get && tmp.push(at3.get);
                }, tmp = []) || tmp.join(".")) + "." + (to.path || []).join(".")) });
                as.ran(as);
                return;
              }
              var seen = as.seen || (as.seen = []), i2 = seen.length;
              while (i2--) {
                if (d === (tmp = seen[i2]).it) {
                  v = d = tmp.link;
                  break;
                }
              }
            }
            if (k && v) {
              at2.node = state_ify(at2.node, k, s3, d);
            } else {
              let resolve3 = function(msg, eve) {
                var end = cat.link["#"];
                if (eve) {
                  eve.off();
                  eve.rid(msg);
                }
                var soul = end || msg.soul || (tmp = (msg.$$ || msg.$)._ || "").soul || tmp.link || ((tmp = tmp.put || "")._ || "")["#"] || tmp["#"] || ((tmp = msg.put || "") && msg.$$ ? tmp["#"] : (tmp["="] || tmp[":"] || "")["#"]);
                !end && stun(as, msg.$);
                if (!soul && !at2.link["#"]) {
                  (at2.wait || (at2.wait = [])).push(function() {
                    resolve3(msg, eve);
                  });
                  return;
                }
                if (!soul) {
                  soul = [];
                  (msg.$$ || msg.$).back(function(at3) {
                    if (tmp = at3.soul || at3.link) {
                      return soul.push(tmp);
                    }
                    soul.push(at3.get);
                  });
                  soul = soul.reverse().join("/");
                }
                cat.link["#"] = soul;
                !g && (((as.graph || (as.graph = {}))[soul] = cat.node || (cat.node = { _: {} }))._["#"] = soul);
                delete as.wait[id];
                cat.wait && setTimeout.each(cat.wait, function(cb2) {
                  cb2 && cb2();
                });
                as.ran(as);
              };
              var resolve2 = resolve3;
              as.seen.push(cat = { it: d, link: {}, todo: g ? [] : Object.keys(d).sort().reverse(), path: (to.path || []).slice(), up: at2 });
              at2.node = state_ify(at2.node, k, s3, cat.link);
              !g && cat.todo.length && to.push(cat);
              var id = as.seen.length;
              (as.wait || (as.wait = {}))[id] = "";
              tmp = (cat.ref = g ? d : k ? at2.ref.get(k) : at2.ref)._;
              (tmp = d && (d._ || "")["#"] || tmp.soul || tmp.link) ? resolve3({ soul: tmp }) : cat.ref.get(resolve3, { run: as.run, v2020: 1, out: { get: { ".": " " } } });
              ;
            }
            if (!to.length) {
              return as.ran(as);
            }
            as.turn(walk);
          })();
          return gun;
        };
        function stun(as, id) {
          if (!id) {
            return;
          }
          id = (id._ || "").id || id;
          var run2 = as.root.stun || (as.root.stun = { on: Gun3.on }), test = {}, tmp;
          as.stun || (as.stun = run2.on("stun", function() {
          }));
          if (tmp = run2.on("" + id)) {
            tmp.the.last.next(test);
          }
          if (test.run >= as.run) {
            return;
          }
          run2.on("" + id, function(test2) {
            if (as.stun.end) {
              this.off();
              this.to.next(test2);
              return;
            }
            test2.run = test2.run || as.run;
            test2.stun = test2.stun || as.stun;
            return;
            if (this.to.to) {
              this.the.last.next(test2);
              return;
            }
            test2.stun = as.stun;
          });
        }
        function ran(as) {
          if (as.err) {
            ran.end(as.stun, as.root);
            return;
          }
          if (as.todo.length || as.end || !Object.empty(as.wait)) {
            return;
          }
          as.end = 1;
          var cat = as.$.back(-1)._, root = cat.root, ask = cat.ask(function(ack) {
            root.on("ack", ack);
            if (ack.err) {
              Gun3.log(ack);
            }
            if (++acks > (as.acks || 0)) {
              this.off();
            }
            if (!as.ack) {
              return;
            }
            as.ack(ack, this);
          }, as.opt), acks = 0, stun2 = as.stun, tmp;
          (tmp = function() {
            if (!stun2) {
              return;
            }
            ran.end(stun2, root);
            setTimeout.each(Object.keys(stun2 = stun2.add || ""), function(cb) {
              if (cb = stun2[cb]) {
                cb();
              }
            });
          }).hatch = tmp;
          as.via._.on("out", { put: as.out = as.graph, opt: as.opt, "#": ask, _: tmp });
        }
        ;
        ran.end = function(stun2, root) {
          stun2.end = noop4;
          if (stun2.the.to === stun2 && stun2 === stun2.the.last) {
            delete root.stun;
          }
          stun2.off();
        };
        function get(as) {
          var at = as.via._, tmp;
          as.via = as.via.back(function(at2) {
            if (at2.soul || !at2.get) {
              return at2.$;
            }
            tmp = as.data;
            (as.data = {})[at2.get] = tmp;
          });
          if (!as.via || !as.via._.soul) {
            as.via = at.root.$.get(((as.data || "")._ || "")["#"] || at.$.back("opt.uuid")());
          }
          as.via.put(as.data, as.ack, as);
          return;
          if (at.get && at.back.soul) {
            tmp = as.data;
            as.via = at.back.$;
            (as.data = {})[at.get] = tmp;
            as.via.put(as.data, as.ack, as);
            return;
          }
        }
        var u, empty2 = {}, noop4 = function() {
        }, turn = setTimeout.turn, valid = Gun3.valid, state_ify = Gun3.state.ify;
        var iife = function(fn, as) {
          fn.call(as || empty2);
        };
      })(USE, "./put");
      ;
      USE(function(module3) {
        var Gun3 = USE("./root");
        USE("./chain");
        USE("./back");
        USE("./put");
        USE("./get");
        module3.exports = Gun3;
      })(USE, "./index");
      ;
      USE(function(module3) {
        var Gun3 = USE("./index");
        Gun3.chain.on = function(tag, arg, eas, as) {
          var gun = this, cat = gun._, root = cat.root, act, off, id, tmp;
          if (typeof tag === "string") {
            if (!arg) {
              return cat.on(tag);
            }
            act = cat.on(tag, arg, eas || cat, as);
            if (eas && eas.$) {
              (eas.subs || (eas.subs = [])).push(act);
            }
            return gun;
          }
          var opt = arg;
          (opt = opt === true ? { change: true } : opt || {}).not = 1;
          opt.on = 1;
          var wait = {};
          gun.get(tag, opt);
          return gun;
        };
        Gun3.chain.once = function(cb, opt) {
          opt = opt || {};
          if (!cb) {
            return none(this, opt);
          }
          var gun = this, cat = gun._, root = cat.root, data = cat.put, id = String.random(7), one, tmp;
          gun.get(function(data2, key, msg, eve) {
            var $ = this, at = $._, one2 = at.one || (at.one = {});
            if (eve.stun) {
              return;
            }
            if (one2[id] === "") {
              return;
            }
            if ((tmp = Gun3.valid(data2)) === true) {
              once();
              return;
            }
            if (typeof tmp == "string") {
              return;
            }
            clearTimeout((cat.one || "")[id]);
            clearTimeout(one2[id]);
            one2[id] = setTimeout(once, opt.wait || 99);
            function once() {
              if (!at.has && !at.soul) {
                at = { put: data2, get: key };
              }
              if (u === (tmp = at.put)) {
                tmp = ((msg.$$ || "")._ || "").put;
              }
              if (typeof Gun3.valid(tmp) == "string") {
                tmp = root.$.get(tmp)._.put;
                if (tmp === u) {
                  return;
                }
              }
              if (eve.stun) {
                return;
              }
              if (one2[id] === "") {
                return;
              }
              one2[id] = "";
              if (cat.soul || cat.has) {
                eve.off();
              }
              cb.call($, tmp, at.get);
            }
            ;
          }, { on: 1 });
          return gun;
        };
        function none(gun, opt, chain) {
          Gun3.log.once("valonce", "Chainable val is experimental, its behavior and API may change moving forward. Please play with it and report bugs and ideas on how to improve it.");
          (chain = gun.chain())._.nix = gun.once(function(data, key) {
            chain._.on("in", this._);
          });
          chain._.lex = gun._.lex;
          return chain;
        }
        Gun3.chain.off = function() {
          var gun = this, at = gun._, tmp;
          var cat = at.back;
          if (!cat) {
            return;
          }
          at.ack = 0;
          if (tmp = cat.next) {
            if (tmp[at.get]) {
              delete tmp[at.get];
            } else {
            }
          }
          if (tmp = cat.ask) {
            delete tmp[at.get];
          }
          if (tmp = cat.put) {
            delete tmp[at.get];
          }
          if (tmp = at.soul) {
            delete cat.root.graph[tmp];
          }
          if (tmp = at.map) {
            Object.keys(tmp).forEach(function(i2, at2) {
              at2 = tmp[i2];
              if (at2.link) {
                cat.root.$.get(at2.link).off();
              }
            });
          }
          if (tmp = at.next) {
            Object.keys(tmp).forEach(function(i2, neat) {
              neat = tmp[i2];
              neat.$.off();
            });
          }
          at.on("off", {});
          return gun;
        };
        var empty2 = {}, noop4 = function() {
        }, u;
      })(USE, "./on");
      ;
      USE(function(module3) {
        var Gun3 = USE("./index"), next = Gun3.chain.get.next;
        Gun3.chain.get.next = function(gun, lex) {
          var tmp;
          if (!Object.plain(lex)) {
            return (next || noop4)(gun, lex);
          }
          if (tmp = ((tmp = lex["#"]) || "")["="] || tmp) {
            return gun.get(tmp);
          }
          (tmp = gun.chain()._).lex = lex;
          gun.on("in", function(eve) {
            if (String.match(eve.get || (eve.put || "")["."], lex["."] || lex["#"] || lex)) {
              tmp.on("in", eve);
            }
            this.to.next(eve);
          });
          return tmp.$;
        };
        Gun3.chain.map = function(cb, opt, t2) {
          var gun = this, cat = gun._, lex, chain;
          if (Object.plain(cb)) {
            lex = cb["."] ? cb : { ".": cb };
            cb = u;
          }
          if (!cb) {
            if (chain = cat.each) {
              return chain;
            }
            (cat.each = chain = gun.chain())._.lex = lex || chain._.lex || cat.lex;
            chain._.nix = gun.back("nix");
            gun.on("in", map, chain._);
            return chain;
          }
          Gun3.log.once("mapfn", "Map functions are experimental, their behavior and API may change moving forward. Please play with it and report bugs and ideas on how to improve it.");
          chain = gun.chain();
          gun.map().on(function(data, key, msg, eve) {
            var next2 = (cb || noop4).call(this, data, key, msg, eve);
            if (u === next2) {
              return;
            }
            if (data === next2) {
              return chain._.on("in", msg);
            }
            if (Gun3.is(next2)) {
              return chain._.on("in", next2._);
            }
            var tmp = {};
            Object.keys(msg.put).forEach(function(k) {
              tmp[k] = msg.put[k];
            }, tmp);
            tmp["="] = next2;
            chain._.on("in", { get: key, put: tmp });
          });
          return chain;
        };
        function map(msg) {
          this.to.next(msg);
          var cat = this.as, gun = msg.$, at = gun._, put = msg.put, tmp;
          if (!at.soul && !msg.$$) {
            return;
          }
          if ((tmp = cat.lex) && !String.match(msg.get || (put || "")["."], tmp["."] || tmp["#"] || tmp)) {
            return;
          }
          Gun3.on.link(msg, cat);
        }
        var noop4 = function() {
        }, event = { stun: noop4, off: noop4 }, u;
      })(USE, "./map");
      ;
      USE(function(module3) {
        var Gun3 = USE("./index");
        Gun3.chain.set = function(item, cb, opt) {
          var gun = this, root = gun.back(-1), soul, tmp;
          cb = cb || function() {
          };
          opt = opt || {};
          opt.item = opt.item || item;
          if (soul = ((item || "")._ || "")["#"]) {
            (item = {})["#"] = soul;
          }
          if (typeof (tmp = Gun3.valid(item)) == "string") {
            return gun.get(soul = tmp).put(item, cb, opt);
          }
          if (!Gun3.is(item)) {
            if (Object.plain(item)) {
              item = root.get(soul = gun.back("opt.uuid")()).put(item);
            }
            return gun.get(soul || root.back("opt.uuid")(7)).put(item, cb, opt);
          }
          gun.put(function(go) {
            item.get(function(soul2, o, msg) {
              if (!soul2) {
                return cb.call(gun, { err: Gun3.log('Only a node can be linked! Not "' + msg.put + '"!') });
              }
              (tmp = {})[soul2] = { "#": soul2 };
              go(tmp);
            }, true);
          });
          return item;
        };
      })(USE, "./set");
      ;
      USE(function(module3) {
        USE("./shim");
        function Mesh(root) {
          var mesh = function() {
          };
          var opt = root.opt || {};
          opt.log = opt.log || console.log;
          opt.gap = opt.gap || opt.wait || 0;
          opt.max = opt.max || (opt.memory ? opt.memory * 999 * 999 : 3e8) * 0.3;
          opt.pack = opt.pack || opt.max * 0.01 * 0.01;
          opt.puff = opt.puff || 9;
          var puff = setTimeout.turn || setTimeout;
          var parse = JSON.parseAsync || function(t2, cb, r2) {
            var u2;
            try {
              cb(u2, JSON.parse(t2, r2));
            } catch (e2) {
              cb(e2);
            }
          };
          var json = JSON.stringifyAsync || function(v, cb, r2, s3) {
            var u2;
            try {
              cb(u2, JSON.stringify(v, r2, s3));
            } catch (e2) {
              cb(e2);
            }
          };
          var dup = root.dup, dup_check = dup.check, dup_track = dup.track;
          var ST = +new Date(), LT = ST;
          var hear = mesh.hear = function(raw, peer) {
            if (!raw) {
              return;
            }
            if (opt.max <= raw.length) {
              return mesh.say({ dam: "!", err: "Message too big!" }, peer);
            }
            if (mesh === this) {
              hear.d += raw.length || 0;
              ++hear.c;
            }
            var S2 = peer.SH = +new Date();
            var tmp = raw[0], msg;
            if (tmp === "[") {
              parse(raw, function(err, msg2) {
                if (err || !msg2) {
                  return mesh.say({ dam: "!", err: "DAM JSON parse error." }, peer);
                }
                console.STAT && console.STAT(+new Date(), msg2.length, "# on hear batch");
                var P = opt.puff;
                (function go() {
                  var S3 = +new Date();
                  var i2 = 0, m2;
                  while (i2 < P && (m2 = msg2[i2++])) {
                    hear(m2, peer);
                  }
                  msg2 = msg2.slice(i2);
                  console.STAT && console.STAT(S3, +new Date() - S3, "hear loop");
                  flush(peer);
                  if (!msg2.length) {
                    return;
                  }
                  puff(go, 0);
                })();
              });
              raw = "";
              return;
            }
            if (tmp === "{" || (raw["#"] || Object.plain(raw)) && (msg = raw)) {
              if (msg) {
                return hear.one(msg, peer, S2);
              }
              parse(raw, function(err, msg2) {
                if (err || !msg2) {
                  return mesh.say({ dam: "!", err: "DAM JSON parse error." }, peer);
                }
                hear.one(msg2, peer, S2);
              });
              return;
            }
          };
          hear.one = function(msg, peer, S2) {
            var id, hash2, tmp, ash, DBG;
            if (msg.DBG) {
              msg.DBG = DBG = { DBG: msg.DBG };
            }
            DBG && (DBG.h = S2);
            DBG && (DBG.hp = +new Date());
            if (!(id = msg["#"])) {
              id = msg["#"] = String.random(9);
            }
            if (tmp = dup_check(id)) {
              return;
            }
            if (!(hash2 = msg["##"]) && false) {
            }
            if (hash2 && (tmp = msg["@"] || msg.get && id) && dup.check(ash = tmp + hash2)) {
              return;
            }
            (msg._ = function() {
            }).via = mesh.leap = peer;
            if ((tmp = msg["><"]) && typeof tmp == "string") {
              tmp.slice(0, 99).split(",").forEach(function(k) {
                this[k] = 1;
              }, msg._.yo = {});
            }
            if (tmp = msg.dam) {
              if (tmp = mesh.hear[tmp]) {
                tmp(msg, peer, root);
              }
              dup_track(id);
              return;
            }
            var S2 = +new Date();
            DBG && (DBG.is = S2);
            peer.SI = id;
            root.on("in", mesh.last = msg);
            DBG && (DBG.hd = +new Date());
            console.STAT && console.STAT(S2, +new Date() - S2, msg.get ? "msg get" : msg.put ? "msg put" : "msg");
            (tmp = dup_track(id)).via = peer;
            if (msg.get) {
              tmp.it = msg;
            }
            if (ash) {
              dup_track(ash);
            }
            mesh.leap = mesh.last = null;
          };
          var tomap = function(k, i2, m2) {
            m2(k, true);
          };
          var noop4 = function() {
          };
          hear.c = hear.d = 0;
          ;
          (function() {
            var SMIA = 0;
            var loop;
            mesh.hash = function(msg, peer) {
              var h2, s3, t2;
              var S2 = +new Date();
              json(msg.put, function hash2(err, text) {
                var ss = (s3 || (s3 = t2 = text || "")).slice(0, 32768);
                h2 = String.hash(ss, h2);
                s3 = s3.slice(32768);
                if (s3) {
                  puff(hash2, 0);
                  return;
                }
                console.STAT && console.STAT(S2, +new Date() - S2, "say json+hash");
                msg._.$put = t2;
                msg["##"] = h2;
                say(msg, peer);
                delete msg._.$put;
              }, sort);
            };
            function sort(k, v) {
              var tmp;
              if (!(v instanceof Object)) {
                return v;
              }
              Object.keys(v).sort().forEach(sorta, { to: tmp = {}, on: v });
              return tmp;
            }
            function sorta(k) {
              this.to[k] = this.on[k];
            }
            var say = mesh.say = function(msg, peer) {
              var tmp;
              if ((tmp = this) && (tmp = tmp.to) && tmp.next) {
                tmp.next(msg);
              }
              if (!msg) {
                return false;
              }
              var id, hash2, raw, ack = msg["@"];
              var meta = msg._ || (msg._ = function() {
              });
              var DBG = msg.DBG, S2 = +new Date();
              meta.y = meta.y || S2;
              if (!peer) {
                DBG && (DBG.y = S2);
              }
              if (!(id = msg["#"])) {
                id = msg["#"] = String.random(9);
              }
              !loop && dup_track(id);
              if (msg.put && (msg.err || (dup.s[id] || "").err)) {
                return false;
              }
              if (!(hash2 = msg["##"]) && u !== msg.put && !meta.via && ack) {
                mesh.hash(msg, peer);
                return;
              }
              if (!peer && ack) {
                peer = (tmp = dup.s[ack]) && (tmp.via || (tmp = tmp.it) && (tmp = tmp._) && tmp.via) || (tmp = mesh.last) && ack === tmp["#"] && mesh.leap;
              }
              if (!peer && ack) {
                if (dup.s[ack]) {
                  return;
                }
                console.STAT && console.STAT(+new Date(), ++SMIA, "total no peer to ack to");
                return false;
              }
              if (!peer && mesh.way) {
                return mesh.way(msg);
              }
              DBG && (DBG.yh = +new Date());
              if (!(raw = meta.raw)) {
                mesh.raw(msg, peer);
                return;
              }
              DBG && (DBG.yr = +new Date());
              if (!peer || !peer.id) {
                if (!Object.plain(peer || opt.peers)) {
                  return false;
                }
                var S2 = +new Date();
                var P = opt.puff, ps = opt.peers, pl = Object.keys(peer || opt.peers || {});
                console.STAT && console.STAT(S2, +new Date() - S2, "peer keys");
                ;
                (function go() {
                  var S3 = +new Date();
                  loop = 1;
                  var wr = meta.raw;
                  meta.raw = raw;
                  var i2 = 0, p;
                  while (i2 < 9 && (p = (pl || "")[i2++])) {
                    if (!(p = ps[p])) {
                      continue;
                    }
                    say(msg, p);
                  }
                  meta.raw = wr;
                  loop = 0;
                  pl = pl.slice(i2);
                  console.STAT && console.STAT(S3, +new Date() - S3, "say loop");
                  if (!pl.length) {
                    return;
                  }
                  puff(go, 0);
                  ack && dup_track(ack);
                })();
                return;
              }
              if (!peer.wire && mesh.wire) {
                mesh.wire(peer);
              }
              if (id === peer.last) {
                return;
              }
              peer.last = id;
              if (peer === meta.via) {
                return false;
              }
              if ((tmp = meta.yo) && (tmp[peer.url] || tmp[peer.pid] || tmp[peer.id])) {
                return false;
              }
              console.STAT && console.STAT(S2, ((DBG || meta).yp = +new Date()) - (meta.y || S2), "say prep");
              !loop && ack && dup_track(ack);
              if (peer.batch) {
                peer.tail = (tmp = peer.tail || 0) + raw.length;
                if (peer.tail <= opt.pack) {
                  peer.batch += (tmp ? "," : "") + raw;
                  return;
                }
                flush(peer);
              }
              peer.batch = "[";
              var ST2 = +new Date();
              setTimeout(function() {
                console.STAT && console.STAT(ST2, +new Date() - ST2, "0ms TO");
                flush(peer);
              }, opt.gap);
              send(raw, peer);
              console.STAT && ack === peer.SI && console.STAT(S2, +new Date() - peer.SH, "say ack");
            };
            mesh.say.c = mesh.say.d = 0;
            mesh.raw = function(msg, peer) {
              if (!msg) {
                return "";
              }
              var meta = msg._ || {}, put, tmp;
              if (tmp = meta.raw) {
                return tmp;
              }
              if (typeof msg == "string") {
                return msg;
              }
              var hash2 = msg["##"], ack = msg["@"];
              if (hash2 && ack) {
                if (!meta.via && dup_check(ack + hash2)) {
                  return false;
                }
                if ((tmp = (dup.s[ack] || "").it) || (tmp = mesh.last) && ack === tmp["#"]) {
                  if (hash2 === tmp["##"]) {
                    return false;
                  }
                  if (!tmp["##"]) {
                    tmp["##"] = hash2;
                  }
                }
              }
              if (!msg.dam) {
                var i2 = 0, to = [];
                tmp = opt.peers;
                for (var k in tmp) {
                  var p = tmp[k];
                  to.push(p.url || p.pid || p.id);
                  if (++i2 > 6) {
                    break;
                  }
                }
                if (i2 > 1) {
                  msg["><"] = to.join();
                }
              }
              if (put = meta.$put) {
                tmp = {};
                Object.keys(msg).forEach(function(k2) {
                  tmp[k2] = msg[k2];
                });
                tmp.put = ":])([:";
                json(tmp, function(err, raw) {
                  if (err) {
                    return;
                  }
                  var S2 = +new Date();
                  tmp = raw.indexOf('"put":":])([:"');
                  res(u, raw = raw.slice(0, tmp + 6) + put + raw.slice(tmp + 14));
                  console.STAT && console.STAT(S2, +new Date() - S2, "say slice");
                });
                return;
              }
              json(msg, res);
              function res(err, raw) {
                if (err) {
                  return;
                }
                meta.raw = raw;
                say(msg, peer);
              }
            };
          })();
          function flush(peer) {
            var tmp = peer.batch, t2 = typeof tmp == "string", l;
            if (t2) {
              tmp += "]";
            }
            peer.batch = peer.tail = null;
            if (!tmp) {
              return;
            }
            if (t2 ? 3 > tmp.length : !tmp.length) {
              return;
            }
            if (!t2) {
              try {
                tmp = tmp.length === 1 ? tmp[0] : JSON.stringify(tmp);
              } catch (e2) {
                return opt.log("DAM JSON stringify error", e2);
              }
            }
            if (!tmp) {
              return;
            }
            send(tmp, peer);
          }
          function send(raw, peer) {
            try {
              var wire = peer.wire;
              if (peer.say) {
                peer.say(raw);
              } else if (wire.send) {
                wire.send(raw);
              }
              mesh.say.d += raw.length || 0;
              ++mesh.say.c;
            } catch (e2) {
              (peer.queue = peer.queue || []).push(raw);
            }
          }
          mesh.hi = function(peer) {
            var tmp = peer.wire || {};
            if (peer.id) {
              opt.peers[peer.url || peer.id] = peer;
            } else {
              tmp = peer.id = peer.id || String.random(9);
              mesh.say({ dam: "?", pid: root.opt.pid }, opt.peers[tmp] = peer);
              delete dup.s[peer.last];
            }
            peer.met = peer.met || +new Date();
            if (!tmp.hied) {
              root.on(tmp.hied = "hi", peer);
            }
            tmp = peer.queue;
            peer.queue = [];
            setTimeout.each(tmp || [], function(msg) {
              send(msg, peer);
            }, 0, 9);
          };
          mesh.bye = function(peer) {
            root.on("bye", peer);
            var tmp = +new Date();
            tmp = tmp - (peer.met || tmp);
            mesh.bye.time = ((mesh.bye.time || tmp) + tmp) / 2;
          };
          mesh.hear["!"] = function(msg, peer) {
            opt.log("Error:", msg.err);
          };
          mesh.hear["?"] = function(msg, peer) {
            if (msg.pid) {
              if (!peer.pid) {
                peer.pid = msg.pid;
              }
              if (msg["@"]) {
                return;
              }
            }
            mesh.say({ dam: "?", pid: opt.pid, "@": msg["#"] }, peer);
            delete dup.s[peer.last];
          };
          root.on("create", function(root2) {
            root2.opt.pid = root2.opt.pid || String.random(9);
            this.to.next(root2);
            root2.on("out", mesh.say);
          });
          root.on("bye", function(peer, tmp) {
            peer = opt.peers[peer.id || peer] || peer;
            this.to.next(peer);
            peer.bye ? peer.bye() : (tmp = peer.wire) && tmp.close && tmp.close();
            delete opt.peers[peer.id];
            peer.wire = null;
          });
          var gets = {};
          root.on("bye", function(peer, tmp) {
            this.to.next(peer);
            if (tmp = console.STAT) {
              tmp.peers = (tmp.peers || 0) - 1;
            }
            if (!(tmp = peer.url)) {
              return;
            }
            gets[tmp] = true;
            setTimeout(function() {
              delete gets[tmp];
            }, opt.lack || 9e3);
          });
          root.on("hi", function(peer, tmp) {
            this.to.next(peer);
            if (tmp = console.STAT) {
              tmp.peers = (tmp.peers || 0) + 1;
            }
            if (!(tmp = peer.url) || !gets[tmp]) {
              return;
            }
            delete gets[tmp];
            if (opt.super) {
              return;
            }
            setTimeout.each(Object.keys(root.next), function(soul) {
              var node = root.next[soul];
              tmp = {};
              tmp[soul] = root.graph[soul];
              tmp = String.hash(tmp);
              mesh.say({ "##": tmp, get: { "#": soul } }, peer);
            });
          });
          return mesh;
        }
        var empty2 = {}, ok = true, u;
        try {
          module3.exports = Mesh;
        } catch (e2) {
        }
      })(USE, "./mesh");
      ;
      USE(function(module3) {
        var Gun3 = USE("../index");
        Gun3.Mesh = USE("./mesh");
        Gun3.on("opt", function(root) {
          this.to.next(root);
          if (root.once) {
            return;
          }
          var opt = root.opt;
          if (opt.WebSocket === false) {
            return;
          }
          var env = Gun3.window || {};
          var websocket = opt.WebSocket || env.WebSocket || env.webkitWebSocket || env.mozWebSocket;
          if (!websocket) {
            return;
          }
          opt.WebSocket = websocket;
          var mesh = opt.mesh = opt.mesh || Gun3.Mesh(root);
          var wire = mesh.wire || opt.wire;
          mesh.wire = opt.wire = open;
          function open(peer) {
            try {
              if (!peer || !peer.url) {
                return wire2 && wire2(peer);
              }
              var url = peer.url.replace(/^http/, "ws");
              var wire2 = peer.wire = new opt.WebSocket(url);
              wire2.onclose = function() {
                opt.mesh.bye(peer);
                reconnect(peer);
              };
              wire2.onerror = function(error2) {
                reconnect(peer);
              };
              wire2.onopen = function() {
                opt.mesh.hi(peer);
              };
              wire2.onmessage = function(msg) {
                if (!msg) {
                  return;
                }
                opt.mesh.hear(msg.data || msg, peer);
              };
              return wire2;
            } catch (e2) {
            }
          }
          setTimeout(function() {
            !opt.super && root.on("out", { dam: "hi" });
          }, 1);
          var wait = 2 * 999;
          function reconnect(peer) {
            clearTimeout(peer.defer);
            if (doc && peer.retry <= 0) {
              return;
            }
            peer.retry = (peer.retry || opt.retry + 1 || 60) - (-peer.tried + (peer.tried = +new Date()) < wait * 4 ? 1 : 0);
            peer.defer = setTimeout(function to() {
              if (doc && doc.hidden) {
                return setTimeout(to, wait);
              }
              open(peer);
            }, wait);
          }
          var doc = "" + u !== typeof document && document;
        });
        var noop4 = function() {
        }, u;
      })(USE, "./websocket");
      ;
      USE(function(module3) {
        if (typeof Gun === "undefined") {
          return;
        }
        var noop4 = function() {
        }, store, u;
        try {
          store = (Gun.window || noop4).localStorage;
        } catch (e2) {
        }
        if (!store) {
          Gun.log("Warning: No localStorage exists to persist data to!");
          store = { setItem: function(k, v) {
            this[k] = v;
          }, removeItem: function(k) {
            delete this[k];
          }, getItem: function(k) {
            return this[k];
          } };
        }
        Gun.on("create", function lg(root) {
          this.to.next(root);
          var opt = root.opt, graph = root.graph, acks = [], disk, to;
          if (opt.localStorage === false) {
            return;
          }
          opt.prefix = opt.file || "gun/";
          try {
            disk = lg[opt.prefix] = lg[opt.prefix] || JSON.parse(store.getItem(opt.prefix)) || {};
          } catch (e2) {
            disk = lg[opt.prefix] = {};
          }
          root.on("get", function(msg) {
            this.to.next(msg);
            var lex = msg.get, soul, data, tmp, u2;
            if (!lex || !(soul = lex["#"])) {
              return;
            }
            data = disk[soul] || u2;
            if (data && (tmp = lex["."]) && !Object.plain(tmp)) {
              data = Gun.state.ify({}, tmp, Gun.state.is(data, tmp), data[tmp], soul);
            }
            Gun.on.get.ack(msg, data);
          });
          root.on("put", function(msg) {
            this.to.next(msg);
            var put = msg.put, soul = put["#"], key = put["."], tmp;
            disk[soul] = Gun.state.ify(disk[soul], key, put[">"], put[":"], soul);
            if (!msg["@"]) {
              acks.push(msg["#"]);
            }
            if (to) {
              return;
            }
            to = setTimeout(flush, opt.wait || 1);
          });
          function flush() {
            var err, ack = acks;
            clearTimeout(to);
            to = false;
            acks = [];
            try {
              store.setItem(opt.prefix, JSON.stringify(disk));
            } catch (e2) {
              Gun.log((err = e2 || "localStorage failure") + " Consider using GUN's IndexedDB plugin for RAD for more storage space, https://gun.eco/docs/RAD#install");
              root.on("localStorage:error", { err, get: opt.prefix, put: disk });
            }
            if (!err && !Object.empty(opt.peers)) {
              return;
            }
            setTimeout.each(ack, function(id) {
              root.on("in", { "@": id, err, ok: 0 });
            });
          }
        });
      })(USE, "./localStorage");
    })();
    (function() {
      var u;
      if ("" + u == typeof Gun) {
        return;
      }
      var DEP = function(n) {
        console.log("Warning! Deprecated internal utility will break in next version:", n);
      };
      var Type = Gun;
      Type.fn = Type.fn || { is: function(fn2) {
        DEP("fn");
        return !!fn2 && typeof fn2 == "function";
      } };
      Type.bi = Type.bi || { is: function(b) {
        DEP("bi");
        return b instanceof Boolean || typeof b == "boolean";
      } };
      Type.num = Type.num || { is: function(n) {
        DEP("num");
        return !list_is(n) && (n - parseFloat(n) + 1 >= 0 || n === Infinity || n === -Infinity);
      } };
      Type.text = Type.text || { is: function(t2) {
        DEP("text");
        return typeof t2 == "string";
      } };
      Type.text.ify = Type.text.ify || function(t2) {
        DEP("text.ify");
        if (Type.text.is(t2)) {
          return t2;
        }
        if (typeof JSON !== "undefined") {
          return JSON.stringify(t2);
        }
        return t2 && t2.toString ? t2.toString() : t2;
      };
      Type.text.random = Type.text.random || function(l, c) {
        DEP("text.random");
        var s3 = "";
        l = l || 24;
        c = c || "0123456789ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuvwxyz";
        while (l > 0) {
          s3 += c.charAt(Math.floor(Math.random() * c.length));
          l--;
        }
        return s3;
      };
      Type.text.match = Type.text.match || function(t2, o) {
        var tmp, u2;
        DEP("text.match");
        if (typeof t2 !== "string") {
          return false;
        }
        if (typeof o == "string") {
          o = { "=": o };
        }
        o = o || {};
        tmp = o["="] || o["*"] || o[">"] || o["<"];
        if (t2 === tmp) {
          return true;
        }
        if (u2 !== o["="]) {
          return false;
        }
        tmp = o["*"] || o[">"] || o["<"];
        if (t2.slice(0, (tmp || "").length) === tmp) {
          return true;
        }
        if (u2 !== o["*"]) {
          return false;
        }
        if (u2 !== o[">"] && u2 !== o["<"]) {
          return t2 >= o[">"] && t2 <= o["<"] ? true : false;
        }
        if (u2 !== o[">"] && t2 >= o[">"]) {
          return true;
        }
        if (u2 !== o["<"] && t2 <= o["<"]) {
          return true;
        }
        return false;
      };
      Type.text.hash = Type.text.hash || function(s3, c) {
        DEP("text.hash");
        if (typeof s3 !== "string") {
          return;
        }
        c = c || 0;
        if (!s3.length) {
          return c;
        }
        for (var i2 = 0, l = s3.length, n; i2 < l; ++i2) {
          n = s3.charCodeAt(i2);
          c = (c << 5) - c + n;
          c |= 0;
        }
        return c;
      };
      Type.list = Type.list || { is: function(l) {
        DEP("list");
        return l instanceof Array;
      } };
      Type.list.slit = Type.list.slit || Array.prototype.slice;
      Type.list.sort = Type.list.sort || function(k) {
        DEP("list.sort");
        return function(A2, B) {
          if (!A2 || !B) {
            return 0;
          }
          A2 = A2[k];
          B = B[k];
          if (A2 < B) {
            return -1;
          } else if (A2 > B) {
            return 1;
          } else {
            return 0;
          }
        };
      };
      Type.list.map = Type.list.map || function(l, c, _) {
        DEP("list.map");
        return obj_map(l, c, _);
      };
      Type.list.index = 1;
      Type.obj = Type.boj || { is: function(o) {
        DEP("obj");
        return o ? o instanceof Object && o.constructor === Object || Object.prototype.toString.call(o).match(/^\[object (\w+)\]$/)[1] === "Object" : false;
      } };
      Type.obj.put = Type.obj.put || function(o, k, v) {
        DEP("obj.put");
        return (o || {})[k] = v, o;
      };
      Type.obj.has = Type.obj.has || function(o, k) {
        DEP("obj.has");
        return o && Object.prototype.hasOwnProperty.call(o, k);
      };
      Type.obj.del = Type.obj.del || function(o, k) {
        DEP("obj.del");
        if (!o) {
          return;
        }
        o[k] = null;
        delete o[k];
        return o;
      };
      Type.obj.as = Type.obj.as || function(o, k, v, u2) {
        DEP("obj.as");
        return o[k] = o[k] || (u2 === v ? {} : v);
      };
      Type.obj.ify = Type.obj.ify || function(o) {
        DEP("obj.ify");
        if (obj_is(o)) {
          return o;
        }
        try {
          o = JSON.parse(o);
        } catch (e2) {
          o = {};
        }
        ;
        return o;
      };
      (function() {
        var u2;
        function map(v, k) {
          if (obj_has(this, k) && u2 !== this[k]) {
            return;
          }
          this[k] = v;
        }
        Type.obj.to = Type.obj.to || function(from, to) {
          DEP("obj.to");
          to = to || {};
          obj_map(from, map, to);
          return to;
        };
      })();
      Type.obj.copy = Type.obj.copy || function(o) {
        DEP("obj.copy");
        return !o ? o : JSON.parse(JSON.stringify(o));
      };
      (function() {
        function empty2(v, i2) {
          var n = this.n, u2;
          if (n && (i2 === n || obj_is(n) && obj_has(n, i2))) {
            return;
          }
          if (u2 !== i2) {
            return true;
          }
        }
        Type.obj.empty = Type.obj.empty || function(o, n) {
          DEP("obj.empty");
          if (!o) {
            return true;
          }
          return obj_map(o, empty2, { n }) ? false : true;
        };
      })();
      ;
      (function() {
        function t2(k, v) {
          if (arguments.length === 2) {
            t2.r = t2.r || {};
            t2.r[k] = v;
            return;
          }
          t2.r = t2.r || [];
          t2.r.push(k);
        }
        ;
        var keys = Object.keys, map, u2;
        Object.keys = Object.keys || function(o) {
          return map(o, function(v, k, t3) {
            t3(k);
          });
        };
        Type.obj.map = map = Type.obj.map || function(l, c, _) {
          DEP("obj.map");
          var u3, i2 = 0, x2, r2, ll, lle, f3 = typeof c == "function";
          t2.r = u3;
          if (keys && obj_is(l)) {
            ll = keys(l);
            lle = true;
          }
          _ = _ || {};
          if (list_is(l) || ll) {
            x2 = (ll || l).length;
            for (; i2 < x2; i2++) {
              var ii = i2 + Type.list.index;
              if (f3) {
                r2 = lle ? c.call(_, l[ll[i2]], ll[i2], t2) : c.call(_, l[i2], ii, t2);
                if (r2 !== u3) {
                  return r2;
                }
              } else {
                if (c === l[lle ? ll[i2] : i2]) {
                  return ll ? ll[i2] : ii;
                }
              }
            }
          } else {
            for (i2 in l) {
              if (f3) {
                if (obj_has(l, i2)) {
                  r2 = _ ? c.call(_, l[i2], i2, t2) : c(l[i2], i2, t2);
                  if (r2 !== u3) {
                    return r2;
                  }
                }
              } else {
                if (c === l[i2]) {
                  return i2;
                }
              }
            }
          }
          return f3 ? t2.r : Type.list.index ? 0 : -1;
        };
      })();
      Type.time = Type.time || {};
      Type.time.is = Type.time.is || function(t2) {
        DEP("time");
        return t2 ? t2 instanceof Date : +new Date().getTime();
      };
      var fn_is = Type.fn.is;
      var list_is = Type.list.is;
      var obj = Type.obj, obj_is = obj.is, obj_has = obj.has, obj_map = obj.map;
      var Val = {};
      Val.is = function(v) {
        DEP("val.is");
        if (v === u) {
          return false;
        }
        if (v === null) {
          return true;
        }
        if (v === Infinity) {
          return false;
        }
        if (text_is(v) || bi_is(v) || num_is(v)) {
          return true;
        }
        return Val.link.is(v) || false;
      };
      Val.link = Val.rel = { _: "#" };
      ;
      (function() {
        Val.link.is = function(v) {
          DEP("val.link.is");
          if (v && v[rel_] && !v._ && obj_is(v)) {
            var o = {};
            obj_map(v, map, o);
            if (o.id) {
              return o.id;
            }
          }
          return false;
        };
        function map(s3, k) {
          var o = this;
          if (o.id) {
            return o.id = false;
          }
          if (k == rel_ && text_is(s3)) {
            o.id = s3;
          } else {
            return o.id = false;
          }
        }
      })();
      Val.link.ify = function(t2) {
        DEP("val.link.ify");
        return obj_put({}, rel_, t2);
      };
      Type.obj.has._ = ".";
      var rel_ = Val.link._, u;
      var bi_is = Type.bi.is;
      var num_is = Type.num.is;
      var text_is = Type.text.is;
      var obj = Type.obj, obj_is = obj.is, obj_put = obj.put, obj_map = obj.map;
      Type.val = Type.val || Val;
      var Node = { _: "_" };
      Node.soul = function(n, o) {
        DEP("node.soul");
        return n && n._ && n._[o || soul_];
      };
      Node.soul.ify = function(n, o) {
        DEP("node.soul.ify");
        o = typeof o === "string" ? { soul: o } : o || {};
        n = n || {};
        n._ = n._ || {};
        n._[soul_] = o.soul || n._[soul_] || text_random();
        return n;
      };
      Node.soul._ = Val.link._;
      ;
      (function() {
        Node.is = function(n, cb, as) {
          DEP("node.is");
          var s3;
          if (!obj_is(n)) {
            return false;
          }
          if (s3 = Node.soul(n)) {
            return !obj_map(n, map, { as, cb, s: s3, n });
          }
          return false;
        };
        function map(v, k) {
          if (k === Node._) {
            return;
          }
          if (!Val.is(v)) {
            return true;
          }
          if (this.cb) {
            this.cb.call(this.as, v, k, this.n, this.s);
          }
        }
      })();
      ;
      (function() {
        Node.ify = function(obj2, o, as) {
          DEP("node.ify");
          if (!o) {
            o = {};
          } else if (typeof o === "string") {
            o = { soul: o };
          } else if (typeof o == "function") {
            o = { map: o };
          }
          if (o.map) {
            o.node = o.map.call(as, obj2, u, o.node || {});
          }
          if (o.node = Node.soul.ify(o.node || {}, o)) {
            obj_map(obj2, map, { o, as });
          }
          return o.node;
        };
        function map(v, k) {
          var o = this.o, tmp, u2;
          if (o.map) {
            tmp = o.map.call(this.as, v, "" + k, o.node);
            if (u2 === tmp) {
              obj_del(o.node, k);
            } else if (o.node) {
              o.node[k] = tmp;
            }
            return;
          }
          if (Val.is(v)) {
            o.node[k] = v;
          }
        }
      })();
      var obj = Type.obj, obj_is = obj.is, obj_del = obj.del, obj_map = obj.map;
      var text = Type.text, text_random = text.random;
      var soul_ = Node.soul._;
      var u;
      Type.node = Type.node || Node;
      var State = Type.state;
      State.lex = function() {
        DEP("state.lex");
        return State().toString(36).replace(".", "");
      };
      State.to = function(from, k, to) {
        DEP("state.to");
        var val = (from || {})[k];
        if (obj_is(val)) {
          val = obj_copy(val);
        }
        return State.ify(to, k, State.is(from, k), val, Node.soul(from));
      };
      (function() {
        State.map = function(cb, s3, as) {
          DEP("state.map");
          var u2;
          var o = obj_is(o = cb || s3) ? o : null;
          cb = fn_is(cb = cb || s3) ? cb : null;
          if (o && !cb) {
            s3 = num_is(s3) ? s3 : State();
            o[N_] = o[N_] || {};
            obj_map(o, map, { o, s: s3 });
            return o;
          }
          as = as || obj_is(s3) ? s3 : u2;
          s3 = num_is(s3) ? s3 : State();
          return function(v, k, o2, opt) {
            if (!cb) {
              map.call({ o: o2, s: s3 }, v, k);
              return v;
            }
            cb.call(as || this || {}, v, k, o2, opt);
            if (obj_has(o2, k) && u2 === o2[k]) {
              return;
            }
            map.call({ o: o2, s: s3 }, v, k);
          };
        };
        function map(v, k) {
          if (N_ === k) {
            return;
          }
          State.ify(this.o, k, this.s);
        }
      })();
      var obj = Type.obj, obj_as = obj.as, obj_has = obj.has, obj_is = obj.is, obj_map = obj.map, obj_copy = obj.copy;
      var num = Type.num, num_is = num.is;
      var fn = Type.fn, fn_is = fn.is;
      var N_ = Node._, u;
      var Graph = {};
      ;
      (function() {
        Graph.is = function(g, cb, fn2, as) {
          DEP("graph.is");
          if (!g || !obj_is(g) || obj_empty(g)) {
            return false;
          }
          return !obj_map(g, map, { cb, fn: fn2, as });
        };
        function map(n, s3) {
          if (!n || s3 !== Node.soul(n) || !Node.is(n, this.fn, this.as)) {
            return true;
          }
          if (!this.cb) {
            return;
          }
          nf.n = n;
          nf.as = this.as;
          this.cb.call(nf.as, n, s3, nf);
        }
        function nf(fn2) {
          if (fn2) {
            Node.is(nf.n, fn2, nf.as);
          }
        }
      })();
      ;
      (function() {
        Graph.ify = function(obj2, env, as) {
          DEP("graph.ify");
          var at = { path: [], obj: obj2 };
          if (!env) {
            env = {};
          } else if (typeof env === "string") {
            env = { soul: env };
          } else if (typeof env == "function") {
            env.map = env;
          }
          if (typeof as === "string") {
            env.soul = env.soul || as;
            as = u;
          }
          if (env.soul) {
            at.link = Val.link.ify(env.soul);
          }
          env.shell = (as || {}).shell;
          env.graph = env.graph || {};
          env.seen = env.seen || [];
          env.as = env.as || as;
          node(env, at);
          env.root = at.node;
          return env.graph;
        };
        function node(env, at) {
          var tmp;
          if (tmp = seen(env, at)) {
            return tmp;
          }
          at.env = env;
          at.soul = soul;
          if (Node.ify(at.obj, map, at)) {
            at.link = at.link || Val.link.ify(Node.soul(at.node));
            if (at.obj !== env.shell) {
              env.graph[Val.link.is(at.link)] = at.node;
            }
          }
          return at;
        }
        function map(v, k, n) {
          var at = this, env = at.env, is, tmp;
          if (Node._ === k && obj_has(v, Val.link._)) {
            return n._;
          }
          if (!(is = valid(v, k, n, at, env))) {
            return;
          }
          if (!k) {
            at.node = at.node || n || {};
            if (obj_has(v, Node._) && Node.soul(v)) {
              at.node._ = obj_copy(v._);
            }
            at.node = Node.soul.ify(at.node, Val.link.is(at.link));
            at.link = at.link || Val.link.ify(Node.soul(at.node));
          }
          if (tmp = env.map) {
            tmp.call(env.as || {}, v, k, n, at);
            if (obj_has(n, k)) {
              v = n[k];
              if (u === v) {
                obj_del(n, k);
                return;
              }
              if (!(is = valid(v, k, n, at, env))) {
                return;
              }
            }
          }
          if (!k) {
            return at.node;
          }
          if (is === true) {
            return v;
          }
          tmp = node(env, { obj: v, path: at.path.concat(k) });
          if (!tmp.node) {
            return;
          }
          return tmp.link;
        }
        function soul(id) {
          var at = this;
          var prev = Val.link.is(at.link), graph = at.env.graph;
          at.link = at.link || Val.link.ify(id);
          at.link[Val.link._] = id;
          if (at.node && at.node[Node._]) {
            at.node[Node._][Val.link._] = id;
          }
          if (obj_has(graph, prev)) {
            graph[id] = graph[prev];
            obj_del(graph, prev);
          }
        }
        function valid(v, k, n, at, env) {
          var tmp;
          if (Val.is(v)) {
            return true;
          }
          if (obj_is(v)) {
            return 1;
          }
          if (tmp = env.invalid) {
            v = tmp.call(env.as || {}, v, k, n);
            return valid(v, k, n, at, env);
          }
          env.err = "Invalid value at '" + at.path.concat(k).join(".") + "'!";
          if (Type.list.is(v)) {
            env.err += " Use `.set(item)` instead of an Array.";
          }
        }
        function seen(env, at) {
          var arr = env.seen, i2 = arr.length, has;
          while (i2--) {
            has = arr[i2];
            if (at.obj === has.obj) {
              return has;
            }
          }
          arr.push(at);
        }
      })();
      Graph.node = function(node) {
        DEP("graph.node");
        var soul = Node.soul(node);
        if (!soul) {
          return;
        }
        return obj_put({}, soul, node);
      };
      (function() {
        Graph.to = function(graph, root, opt) {
          DEP("graph.to");
          if (!graph) {
            return;
          }
          var obj2 = {};
          opt = opt || { seen: {} };
          obj_map(graph[root], map, { obj: obj2, graph, opt });
          return obj2;
        };
        function map(v, k) {
          var tmp, obj2;
          if (Node._ === k) {
            if (obj_empty(v, Val.link._)) {
              return;
            }
            this.obj[k] = obj_copy(v);
            return;
          }
          if (!(tmp = Val.link.is(v))) {
            this.obj[k] = v;
            return;
          }
          if (obj2 = this.opt.seen[tmp]) {
            this.obj[k] = obj2;
            return;
          }
          this.obj[k] = this.opt.seen[tmp] = Graph.to(this.graph, tmp, this.opt);
        }
      })();
      var fn_is = Type.fn.is;
      var obj = Type.obj, obj_is = obj.is, obj_del = obj.del, obj_has = obj.has, obj_empty = obj.empty, obj_put = obj.put, obj_map = obj.map, obj_copy = obj.copy;
      var u;
      Type.graph = Type.graph || Graph;
    })();
  }
});

// node_modules/gun/sea.js
var require_sea = __commonJS({
  "node_modules/gun/sea.js"(exports, module2) {
    init_shims();
    (function() {
      function USE(arg, req) {
        return req ? require(arg) : arg.slice ? USE[R(arg)] : function(mod, path2) {
          arg(mod = { exports: {} });
          USE[R(path2)] = mod.exports;
        };
        function R(p) {
          return p.split("/").slice(-1).toString().replace(".js", "");
        }
      }
      if (typeof module2 !== "undefined") {
        var MODULE = module2;
      }
      ;
      USE(function(module3) {
        if (typeof window !== "undefined") {
          module3.window = window;
        }
        var tmp = module3.window || module3, u;
        var SEA = tmp.SEA || {};
        if (SEA.window = module3.window) {
          SEA.window.SEA = SEA;
        }
        try {
          if (u + "" !== typeof MODULE) {
            MODULE.exports = SEA;
          }
        } catch (e2) {
        }
        module3.exports = SEA;
      })(USE, "./root");
      ;
      USE(function(module3) {
        var SEA = USE("./root");
        try {
          if (SEA.window) {
            if (location.protocol.indexOf("s") < 0 && location.host.indexOf("localhost") < 0 && !/^127\.\d+\.\d+\.\d+$/.test(location.hostname) && location.protocol.indexOf("file:") < 0) {
              console.warn("HTTPS needed for WebCrypto in SEA, redirecting...");
              location.protocol = "https:";
            }
          }
        } catch (e2) {
        }
      })(USE, "./https");
      ;
      USE(function(module3) {
        var u;
        if (u + "" == typeof btoa) {
          if (u + "" == typeof Buffer) {
            try {
              global.Buffer = USE("buffer", 1).Buffer;
            } catch (e2) {
              console.log("Please `npm install buffer` or add it to your package.json !");
            }
          }
          global.btoa = function(data) {
            return Buffer.from(data, "binary").toString("base64");
          };
          global.atob = function(data) {
            return Buffer.from(data, "base64").toString("binary");
          };
        }
      })(USE, "./base64");
      ;
      USE(function(module3) {
        USE("./base64");
        function SeaArray() {
        }
        Object.assign(SeaArray, { from: Array.from });
        SeaArray.prototype = Object.create(Array.prototype);
        SeaArray.prototype.toString = function(enc, start, end) {
          enc = enc || "utf8";
          start = start || 0;
          const length = this.length;
          if (enc === "hex") {
            const buf = new Uint8Array(this);
            return [...Array((end && end + 1 || length) - start).keys()].map((i2) => buf[i2 + start].toString(16).padStart(2, "0")).join("");
          }
          if (enc === "utf8") {
            return Array.from({ length: (end || length) - start }, (_, i2) => String.fromCharCode(this[i2 + start])).join("");
          }
          if (enc === "base64") {
            return btoa(this);
          }
        };
        module3.exports = SeaArray;
      })(USE, "./array");
      ;
      USE(function(module3) {
        USE("./base64");
        var SeaArray = USE("./array");
        function SafeBuffer(...props) {
          console.warn("new SafeBuffer() is depreciated, please use SafeBuffer.from()");
          return SafeBuffer.from(...props);
        }
        SafeBuffer.prototype = Object.create(Array.prototype);
        Object.assign(SafeBuffer, {
          from() {
            if (!Object.keys(arguments).length || arguments[0] == null) {
              throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
            }
            const input = arguments[0];
            let buf;
            if (typeof input === "string") {
              const enc = arguments[1] || "utf8";
              if (enc === "hex") {
                const bytes = input.match(/([\da-fA-F]{2})/g).map((byte) => parseInt(byte, 16));
                if (!bytes || !bytes.length) {
                  throw new TypeError("Invalid first argument for type 'hex'.");
                }
                buf = SeaArray.from(bytes);
              } else if (enc === "utf8" || enc === "binary") {
                const length2 = input.length;
                const words = new Uint16Array(length2);
                Array.from({ length: length2 }, (_, i2) => words[i2] = input.charCodeAt(i2));
                buf = SeaArray.from(words);
              } else if (enc === "base64") {
                const dec = atob(input);
                const length2 = dec.length;
                const bytes = new Uint8Array(length2);
                Array.from({ length: length2 }, (_, i2) => bytes[i2] = dec.charCodeAt(i2));
                buf = SeaArray.from(bytes);
              } else if (enc === "binary") {
                buf = SeaArray.from(input);
              } else {
                console.info("SafeBuffer.from unknown encoding: " + enc);
              }
              return buf;
            }
            const byteLength = input.byteLength;
            const length = input.byteLength ? input.byteLength : input.length;
            if (length) {
              let buf2;
              if (input instanceof ArrayBuffer) {
                buf2 = new Uint8Array(input);
              }
              return SeaArray.from(buf2 || input);
            }
          },
          alloc(length, fill = 0) {
            return SeaArray.from(new Uint8Array(Array.from({ length }, () => fill)));
          },
          allocUnsafe(length) {
            return SeaArray.from(new Uint8Array(Array.from({ length })));
          },
          concat(arr) {
            if (!Array.isArray(arr)) {
              throw new TypeError("First argument must be Array containing ArrayBuffer or Uint8Array instances.");
            }
            return SeaArray.from(arr.reduce((ret, item) => ret.concat(Array.from(item)), []));
          }
        });
        SafeBuffer.prototype.from = SafeBuffer.from;
        SafeBuffer.prototype.toString = SeaArray.prototype.toString;
        module3.exports = SafeBuffer;
      })(USE, "./buffer");
      ;
      USE(function(module3) {
        const SEA = USE("./root");
        const api = { Buffer: USE("./buffer") };
        var o = {}, u;
        JSON.parseAsync = JSON.parseAsync || function(t2, cb, r2) {
          var u2;
          try {
            cb(u2, JSON.parse(t2, r2));
          } catch (e2) {
            cb(e2);
          }
        };
        JSON.stringifyAsync = JSON.stringifyAsync || function(v, cb, r2, s3) {
          var u2;
          try {
            cb(u2, JSON.stringify(v, r2, s3));
          } catch (e2) {
            cb(e2);
          }
        };
        api.parse = function(t2, r2) {
          return new Promise(function(res, rej) {
            JSON.parseAsync(t2, function(err, raw) {
              err ? rej(err) : res(raw);
            }, r2);
          });
        };
        api.stringify = function(v, r2, s3) {
          return new Promise(function(res, rej) {
            JSON.stringifyAsync(v, function(err, raw) {
              err ? rej(err) : res(raw);
            }, r2, s3);
          });
        };
        if (SEA.window) {
          api.crypto = window.crypto || window.msCrypto;
          api.subtle = (api.crypto || o).subtle || (api.crypto || o).webkitSubtle;
          api.TextEncoder = window.TextEncoder;
          api.TextDecoder = window.TextDecoder;
          api.random = (len) => api.Buffer.from(api.crypto.getRandomValues(new Uint8Array(api.Buffer.alloc(len))));
        }
        if (!api.TextDecoder) {
          const { TextEncoder: TextEncoder2, TextDecoder: TextDecoder2 } = USE((u + "" == typeof MODULE ? "." : "") + "./lib/text-encoding", 1);
          api.TextDecoder = TextDecoder2;
          api.TextEncoder = TextEncoder2;
        }
        if (!api.crypto) {
          try {
            var crypto = USE("crypto", 1);
            Object.assign(api, {
              crypto,
              random: (len) => api.Buffer.from(crypto.randomBytes(len))
            });
            const { Crypto: WebCrypto } = USE("@peculiar/webcrypto", 1);
            api.ossl = api.subtle = new WebCrypto({ directory: "ossl" }).subtle;
          } catch (e2) {
            console.log("Please `npm install @peculiar/webcrypto` or add it to your package.json !");
          }
        }
        module3.exports = api;
      })(USE, "./shim");
      ;
      USE(function(module3) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var s3 = {};
        s3.pbkdf2 = { hash: { name: "SHA-256" }, iter: 1e5, ks: 64 };
        s3.ecdsa = {
          pair: { name: "ECDSA", namedCurve: "P-256" },
          sign: { name: "ECDSA", hash: { name: "SHA-256" } }
        };
        s3.ecdh = { name: "ECDH", namedCurve: "P-256" };
        s3.jwk = function(pub, d) {
          pub = pub.split(".");
          var x2 = pub[0], y = pub[1];
          var jwk = { kty: "EC", crv: "P-256", x: x2, y, ext: true };
          jwk.key_ops = d ? ["sign"] : ["verify"];
          if (d) {
            jwk.d = d;
          }
          return jwk;
        };
        s3.keyToJwk = function(keyBytes) {
          const keyB64 = keyBytes.toString("base64");
          const k = keyB64.replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
          return { kty: "oct", k, ext: false, alg: "A256GCM" };
        };
        s3.recall = {
          validity: 12 * 60 * 60,
          hook: function(props) {
            return props;
          }
        };
        s3.check = function(t2) {
          return typeof t2 == "string" && t2.slice(0, 4) === "SEA{";
        };
        s3.parse = async function p(t2) {
          try {
            var yes = typeof t2 == "string";
            if (yes && t2.slice(0, 4) === "SEA{") {
              t2 = t2.slice(3);
            }
            return yes ? await shim.parse(t2) : t2;
          } catch (e2) {
          }
          return t2;
        };
        SEA.opt = s3;
        module3.exports = s3;
      })(USE, "./settings");
      ;
      USE(function(module3) {
        var shim = USE("./shim");
        module3.exports = async function(d, o) {
          var t2 = typeof d == "string" ? d : await shim.stringify(d);
          var hash2 = await shim.subtle.digest({ name: o || "SHA-256" }, new shim.TextEncoder().encode(t2));
          return shim.Buffer.from(hash2);
        };
      })(USE, "./sha256");
      ;
      USE(function(module3) {
        const __shim = USE("./shim");
        const subtle = __shim.subtle;
        const ossl = __shim.ossl ? __shim.ossl : subtle;
        const sha1hash2 = (b) => ossl.digest({ name: "SHA-1" }, new ArrayBuffer(b));
        module3.exports = sha1hash2;
      })(USE, "./sha1");
      ;
      USE(function(module3) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var S2 = USE("./settings");
        var sha = USE("./sha256");
        var u;
        SEA.work = SEA.work || (async (data, pair, cb, opt) => {
          try {
            var salt = (pair || {}).epub || pair;
            opt = opt || {};
            if (salt instanceof Function) {
              cb = salt;
              salt = u;
            }
            data = typeof data == "string" ? data : await shim.stringify(data);
            if ((opt.name || "").toLowerCase().slice(0, 3) === "sha") {
              var rsha = shim.Buffer.from(await sha(data, opt.name), "binary").toString(opt.encode || "base64");
              if (cb) {
                try {
                  cb(rsha);
                } catch (e2) {
                  console.log(e2);
                }
              }
              return rsha;
            }
            salt = salt || shim.random(9);
            var key = await (shim.ossl || shim.subtle).importKey("raw", new shim.TextEncoder().encode(data), { name: opt.name || "PBKDF2" }, false, ["deriveBits"]);
            var work = await (shim.ossl || shim.subtle).deriveBits({
              name: opt.name || "PBKDF2",
              iterations: opt.iterations || S2.pbkdf2.iter,
              salt: new shim.TextEncoder().encode(opt.salt || salt),
              hash: opt.hash || S2.pbkdf2.hash
            }, key, opt.length || S2.pbkdf2.ks * 8);
            data = shim.random(data.length);
            var r2 = shim.Buffer.from(work, "binary").toString(opt.encode || "base64");
            if (cb) {
              try {
                cb(r2);
              } catch (e2) {
                console.log(e2);
              }
            }
            return r2;
          } catch (e2) {
            console.log(e2);
            SEA.err = e2;
            if (SEA.throw) {
              throw e2;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        module3.exports = SEA.work;
      })(USE, "./work");
      ;
      USE(function(module3) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var S2 = USE("./settings");
        SEA.name = SEA.name || (async (cb, opt) => {
          try {
            if (cb) {
              try {
                cb();
              } catch (e2) {
                console.log(e2);
              }
            }
            return;
          } catch (e2) {
            console.log(e2);
            SEA.err = e2;
            if (SEA.throw) {
              throw e2;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        SEA.pair = SEA.pair || (async (cb, opt) => {
          try {
            var ecdhSubtle = shim.ossl || shim.subtle;
            var sa = await shim.subtle.generateKey({ name: "ECDSA", namedCurve: "P-256" }, true, ["sign", "verify"]).then(async (keys) => {
              var key = {};
              key.priv = (await shim.subtle.exportKey("jwk", keys.privateKey)).d;
              var pub = await shim.subtle.exportKey("jwk", keys.publicKey);
              key.pub = pub.x + "." + pub.y;
              return key;
            });
            try {
              var dh = await ecdhSubtle.generateKey({ name: "ECDH", namedCurve: "P-256" }, true, ["deriveKey"]).then(async (keys) => {
                var key = {};
                key.epriv = (await ecdhSubtle.exportKey("jwk", keys.privateKey)).d;
                var pub = await ecdhSubtle.exportKey("jwk", keys.publicKey);
                key.epub = pub.x + "." + pub.y;
                return key;
              });
            } catch (e2) {
              if (SEA.window) {
                throw e2;
              }
              if (e2 == "Error: ECDH is not a supported algorithm") {
                console.log("Ignoring ECDH...");
              } else {
                throw e2;
              }
            }
            dh = dh || {};
            var r2 = { pub: sa.pub, priv: sa.priv, epub: dh.epub, epriv: dh.epriv };
            if (cb) {
              try {
                cb(r2);
              } catch (e2) {
                console.log(e2);
              }
            }
            return r2;
          } catch (e2) {
            console.log(e2);
            SEA.err = e2;
            if (SEA.throw) {
              throw e2;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        module3.exports = SEA.pair;
      })(USE, "./pair");
      ;
      USE(function(module3) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var S2 = USE("./settings");
        var sha = USE("./sha256");
        var u;
        SEA.sign = SEA.sign || (async (data, pair, cb, opt) => {
          try {
            opt = opt || {};
            if (!(pair || opt).priv) {
              if (!SEA.I) {
                throw "No signing key.";
              }
              pair = await SEA.I(null, { what: data, how: "sign", why: opt.why });
            }
            if (u === data) {
              throw "`undefined` not allowed.";
            }
            var json = await S2.parse(data);
            var check = opt.check = opt.check || json;
            if (SEA.verify && (SEA.opt.check(check) || check && check.s && check.m) && u !== await SEA.verify(check, pair)) {
              var r2 = await S2.parse(check);
              if (!opt.raw) {
                r2 = "SEA" + await shim.stringify(r2);
              }
              if (cb) {
                try {
                  cb(r2);
                } catch (e2) {
                  console.log(e2);
                }
              }
              return r2;
            }
            var pub = pair.pub;
            var priv = pair.priv;
            var jwk = S2.jwk(pub, priv);
            var hash2 = await sha(json);
            var sig = await (shim.ossl || shim.subtle).importKey("jwk", jwk, { name: "ECDSA", namedCurve: "P-256" }, false, ["sign"]).then((key) => (shim.ossl || shim.subtle).sign({ name: "ECDSA", hash: { name: "SHA-256" } }, key, new Uint8Array(hash2)));
            var r2 = { m: json, s: shim.Buffer.from(sig, "binary").toString(opt.encode || "base64") };
            if (!opt.raw) {
              r2 = "SEA" + await shim.stringify(r2);
            }
            if (cb) {
              try {
                cb(r2);
              } catch (e2) {
                console.log(e2);
              }
            }
            return r2;
          } catch (e2) {
            console.log(e2);
            SEA.err = e2;
            if (SEA.throw) {
              throw e2;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        module3.exports = SEA.sign;
      })(USE, "./sign");
      ;
      USE(function(module3) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var S2 = USE("./settings");
        var sha = USE("./sha256");
        var u;
        SEA.verify = SEA.verify || (async (data, pair, cb, opt) => {
          try {
            var json = await S2.parse(data);
            if (pair === false) {
              var raw = await S2.parse(json.m);
              if (cb) {
                try {
                  cb(raw);
                } catch (e2) {
                  console.log(e2);
                }
              }
              return raw;
            }
            opt = opt || {};
            var pub = pair.pub || pair;
            var key = SEA.opt.slow_leak ? await SEA.opt.slow_leak(pub) : await (shim.ossl || shim.subtle).importKey("jwk", S2.jwk(pub), { name: "ECDSA", namedCurve: "P-256" }, false, ["verify"]);
            var hash2 = await sha(json.m);
            var buf, sig, check, tmp;
            try {
              buf = shim.Buffer.from(json.s, opt.encode || "base64");
              sig = new Uint8Array(buf);
              check = await (shim.ossl || shim.subtle).verify({ name: "ECDSA", hash: { name: "SHA-256" } }, key, sig, new Uint8Array(hash2));
              if (!check) {
                throw "Signature did not match.";
              }
            } catch (e2) {
              if (SEA.opt.fallback) {
                return await SEA.opt.fall_verify(data, pair, cb, opt);
              }
            }
            var r2 = check ? await S2.parse(json.m) : u;
            if (cb) {
              try {
                cb(r2);
              } catch (e2) {
                console.log(e2);
              }
            }
            return r2;
          } catch (e2) {
            console.log(e2);
            SEA.err = e2;
            if (SEA.throw) {
              throw e2;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        module3.exports = SEA.verify;
        var knownKeys = {};
        var keyForPair = SEA.opt.slow_leak = (pair) => {
          if (knownKeys[pair])
            return knownKeys[pair];
          var jwk = S2.jwk(pair);
          knownKeys[pair] = (shim.ossl || shim.subtle).importKey("jwk", jwk, { name: "ECDSA", namedCurve: "P-256" }, false, ["verify"]);
          return knownKeys[pair];
        };
        var O = SEA.opt;
        SEA.opt.fall_verify = async function(data, pair, cb, opt, f3) {
          if (f3 === SEA.opt.fallback) {
            throw "Signature did not match";
          }
          f3 = f3 || 1;
          var tmp = data || "";
          data = SEA.opt.unpack(data) || data;
          var json = await S2.parse(data), pub = pair.pub || pair, key = await SEA.opt.slow_leak(pub);
          var hash2 = f3 <= SEA.opt.fallback ? shim.Buffer.from(await shim.subtle.digest({ name: "SHA-256" }, new shim.TextEncoder().encode(await S2.parse(json.m)))) : await sha(json.m);
          var buf;
          var sig;
          var check;
          try {
            buf = shim.Buffer.from(json.s, opt.encode || "base64");
            sig = new Uint8Array(buf);
            check = await (shim.ossl || shim.subtle).verify({ name: "ECDSA", hash: { name: "SHA-256" } }, key, sig, new Uint8Array(hash2));
            if (!check) {
              throw "Signature did not match.";
            }
          } catch (e2) {
            try {
              buf = shim.Buffer.from(json.s, "utf8");
              sig = new Uint8Array(buf);
              check = await (shim.ossl || shim.subtle).verify({ name: "ECDSA", hash: { name: "SHA-256" } }, key, sig, new Uint8Array(hash2));
            } catch (e3) {
              if (!check) {
                throw "Signature did not match.";
              }
            }
          }
          var r2 = check ? await S2.parse(json.m) : u;
          O.fall_soul = tmp["#"];
          O.fall_key = tmp["."];
          O.fall_val = data;
          O.fall_state = tmp[">"];
          if (cb) {
            try {
              cb(r2);
            } catch (e2) {
              console.log(e2);
            }
          }
          return r2;
        };
        SEA.opt.fallback = 2;
      })(USE, "./verify");
      ;
      USE(function(module3) {
        var shim = USE("./shim");
        var S2 = USE("./settings");
        var sha256hash = USE("./sha256");
        const importGen = async (key, salt, opt) => {
          opt = opt || {};
          const combo = key + (salt || shim.random(8)).toString("utf8");
          const hash2 = shim.Buffer.from(await sha256hash(combo), "binary");
          const jwkKey = S2.keyToJwk(hash2);
          return await shim.subtle.importKey("jwk", jwkKey, { name: "AES-GCM" }, false, ["encrypt", "decrypt"]);
        };
        module3.exports = importGen;
      })(USE, "./aeskey");
      ;
      USE(function(module3) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var S2 = USE("./settings");
        var aeskey = USE("./aeskey");
        var u;
        SEA.encrypt = SEA.encrypt || (async (data, pair, cb, opt) => {
          try {
            opt = opt || {};
            var key = (pair || opt).epriv || pair;
            if (u === data) {
              throw "`undefined` not allowed.";
            }
            if (!key) {
              if (!SEA.I) {
                throw "No encryption key.";
              }
              pair = await SEA.I(null, { what: data, how: "encrypt", why: opt.why });
              key = pair.epriv || pair;
            }
            var msg = typeof data == "string" ? data : await shim.stringify(data);
            var rand = { s: shim.random(9), iv: shim.random(15) };
            var ct = await aeskey(key, rand.s, opt).then((aes) => shim.subtle.encrypt({
              name: opt.name || "AES-GCM",
              iv: new Uint8Array(rand.iv)
            }, aes, new shim.TextEncoder().encode(msg)));
            var r2 = {
              ct: shim.Buffer.from(ct, "binary").toString(opt.encode || "base64"),
              iv: rand.iv.toString(opt.encode || "base64"),
              s: rand.s.toString(opt.encode || "base64")
            };
            if (!opt.raw) {
              r2 = "SEA" + await shim.stringify(r2);
            }
            if (cb) {
              try {
                cb(r2);
              } catch (e2) {
                console.log(e2);
              }
            }
            return r2;
          } catch (e2) {
            console.log(e2);
            SEA.err = e2;
            if (SEA.throw) {
              throw e2;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        module3.exports = SEA.encrypt;
      })(USE, "./encrypt");
      ;
      USE(function(module3) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var S2 = USE("./settings");
        var aeskey = USE("./aeskey");
        SEA.decrypt = SEA.decrypt || (async (data, pair, cb, opt) => {
          try {
            opt = opt || {};
            var key = (pair || opt).epriv || pair;
            if (!key) {
              if (!SEA.I) {
                throw "No decryption key.";
              }
              pair = await SEA.I(null, { what: data, how: "decrypt", why: opt.why });
              key = pair.epriv || pair;
            }
            var json = await S2.parse(data);
            var buf, bufiv, bufct;
            try {
              buf = shim.Buffer.from(json.s, opt.encode || "base64");
              bufiv = shim.Buffer.from(json.iv, opt.encode || "base64");
              bufct = shim.Buffer.from(json.ct, opt.encode || "base64");
              var ct = await aeskey(key, buf, opt).then((aes) => shim.subtle.decrypt({
                name: opt.name || "AES-GCM",
                iv: new Uint8Array(bufiv),
                tagLength: 128
              }, aes, new Uint8Array(bufct)));
            } catch (e2) {
              if (opt.encode === "utf8") {
                throw "Could not decrypt";
              }
              if (SEA.opt.fallback) {
                opt.encode = "utf8";
                return await SEA.decrypt(data, pair, cb, opt);
              }
            }
            var r2 = await S2.parse(new shim.TextDecoder("utf8").decode(ct));
            if (cb) {
              try {
                cb(r2);
              } catch (e2) {
                console.log(e2);
              }
            }
            return r2;
          } catch (e2) {
            console.log(e2);
            SEA.err = e2;
            if (SEA.throw) {
              throw e2;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        module3.exports = SEA.decrypt;
      })(USE, "./decrypt");
      ;
      USE(function(module3) {
        var SEA = USE("./root");
        var shim = USE("./shim");
        var S2 = USE("./settings");
        SEA.secret = SEA.secret || (async (key, pair, cb, opt) => {
          try {
            opt = opt || {};
            if (!pair || !pair.epriv || !pair.epub) {
              if (!SEA.I) {
                throw "No secret mix.";
              }
              pair = await SEA.I(null, { what: key, how: "secret", why: opt.why });
            }
            var pub = key.epub || key;
            var epub = pair.epub;
            var epriv = pair.epriv;
            var ecdhSubtle = shim.ossl || shim.subtle;
            var pubKeyData = keysToEcdhJwk(pub);
            var props = Object.assign({ public: await ecdhSubtle.importKey(...pubKeyData, true, []) }, { name: "ECDH", namedCurve: "P-256" });
            var privKeyData = keysToEcdhJwk(epub, epriv);
            var derived = await ecdhSubtle.importKey(...privKeyData, false, ["deriveBits"]).then(async (privKey) => {
              var derivedBits = await ecdhSubtle.deriveBits(props, privKey, 256);
              var rawBits = new Uint8Array(derivedBits);
              var derivedKey = await ecdhSubtle.importKey("raw", rawBits, { name: "AES-GCM", length: 256 }, true, ["encrypt", "decrypt"]);
              return ecdhSubtle.exportKey("jwk", derivedKey).then(({ k }) => k);
            });
            var r2 = derived;
            if (cb) {
              try {
                cb(r2);
              } catch (e2) {
                console.log(e2);
              }
            }
            return r2;
          } catch (e2) {
            console.log(e2);
            SEA.err = e2;
            if (SEA.throw) {
              throw e2;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        var keysToEcdhJwk = (pub, d) => {
          var [x2, y] = pub.split(".");
          var jwk = d ? { d } : {};
          return [
            "jwk",
            Object.assign(jwk, { x: x2, y, kty: "EC", crv: "P-256", ext: true }),
            { name: "ECDH", namedCurve: "P-256" }
          ];
        };
        module3.exports = SEA.secret;
      })(USE, "./secret");
      ;
      USE(function(module3) {
        var SEA = USE("./root");
        SEA.certify = SEA.certify || (async (certificants, policy = {}, authority, cb, opt = {}) => {
          try {
            console.log("SEA.certify() is an early experimental community supported method that may change API behavior without warning in any future version.");
            certificants = (() => {
              var data2 = [];
              if (certificants) {
                if ((typeof certificants === "string" || Array.isArray(certificants)) && certificants.indexOf("*") > -1)
                  return "*";
                if (typeof certificants === "string")
                  return certificants;
                if (Array.isArray(certificants)) {
                  if (certificants.length === 1 && certificants[0])
                    return typeof certificants[0] === "object" && certificants[0].pub ? certificants[0].pub : typeof certificants[0] === "string" ? certificants[0] : null;
                  certificants.map((certificant) => {
                    if (typeof certificant === "string")
                      data2.push(certificant);
                    else if (typeof certificant === "object" && certificant.pub)
                      data2.push(certificant.pub);
                  });
                }
                if (typeof certificants === "object" && certificants.pub)
                  return certificants.pub;
                return data2.length > 0 ? data2 : null;
              }
              return;
            })();
            if (!certificants)
              return console.log("No certificant found.");
            const expiry = opt.expiry && (typeof opt.expiry === "number" || typeof opt.expiry === "string") ? parseFloat(opt.expiry) : null;
            const readPolicy = (policy || {}).read ? policy.read : null;
            const writePolicy = (policy || {}).write ? policy.write : typeof policy === "string" || Array.isArray(policy) || policy["+"] || policy["#"] || policy["."] || policy["="] || policy["*"] || policy[">"] || policy["<"] ? policy : null;
            const block = (opt || {}).block || (opt || {}).blacklist || (opt || {}).ban || {};
            const readBlock = block.read && (typeof block.read === "string" || (block.read || {})["#"]) ? block.read : null;
            const writeBlock = typeof block === "string" ? block : block.write && (typeof block.write === "string" || block.write["#"]) ? block.write : null;
            if (!readPolicy && !writePolicy)
              return console.log("No policy found.");
            const data = JSON.stringify({
              c: certificants,
              ...expiry ? { e: expiry } : {},
              ...readPolicy ? { r: readPolicy } : {},
              ...writePolicy ? { w: writePolicy } : {},
              ...readBlock ? { rb: readBlock } : {},
              ...writeBlock ? { wb: writeBlock } : {}
            });
            const certificate = await SEA.sign(data, authority, null, { raw: 1 });
            var r2 = certificate;
            if (!opt.raw) {
              r2 = "SEA" + JSON.stringify(r2);
            }
            if (cb) {
              try {
                cb(r2);
              } catch (e2) {
                console.log(e2);
              }
            }
            return r2;
          } catch (e2) {
            SEA.err = e2;
            if (SEA.throw) {
              throw e2;
            }
            if (cb) {
              cb();
            }
            return;
          }
        });
        module3.exports = SEA.certify;
      })(USE, "./certify");
      ;
      USE(function(module3) {
        var shim = USE("./shim");
        var SEA = USE("./root");
        SEA.work = USE("./work");
        SEA.sign = USE("./sign");
        SEA.verify = USE("./verify");
        SEA.encrypt = USE("./encrypt");
        SEA.decrypt = USE("./decrypt");
        SEA.certify = USE("./certify");
        SEA.random = SEA.random || shim.random;
        SEA.Buffer = SEA.Buffer || USE("./buffer");
        SEA.keyid = SEA.keyid || (async (pub) => {
          try {
            const pb = shim.Buffer.concat(pub.replace(/-/g, "+").replace(/_/g, "/").split(".").map((t2) => shim.Buffer.from(t2, "base64")));
            const id = shim.Buffer.concat([
              shim.Buffer.from([153, pb.length / 256, pb.length % 256]),
              pb
            ]);
            const sha1 = await sha1hash(id);
            const hash2 = shim.Buffer.from(sha1, "binary");
            return hash2.toString("hex", hash2.length - 8);
          } catch (e2) {
            console.log(e2);
            throw e2;
          }
        });
        ((SEA.window || {}).GUN || {}).SEA = SEA;
        module3.exports = SEA;
      })(USE, "./sea");
      ;
      USE(function(module3) {
        var SEA = USE("./sea"), Gun3, u;
        if (SEA.window) {
          Gun3 = SEA.window.GUN || { chain: {} };
        } else {
          Gun3 = USE((u + "" == typeof MODULE ? "." : "") + "./gun", 1);
        }
        SEA.GUN = Gun3;
        function User(root) {
          this._ = { $: this };
        }
        User.prototype = function() {
          function F2() {
          }
          ;
          F2.prototype = Gun3.chain;
          return new F2();
        }();
        User.prototype.constructor = User;
        Gun3.chain.user = function(pub) {
          var gun = this, root = gun.back(-1), user2;
          if (pub) {
            pub = SEA.opt.pub((pub._ || "")["#"]) || pub;
            return root.get("~" + pub);
          }
          if (user2 = root.back("user")) {
            return user2;
          }
          var root = root._, at = root, uuid = at.opt.uuid || lex;
          (at = (user2 = at.user = gun.chain(new User()))._).opt = {};
          at.opt.uuid = function(cb) {
            var id = uuid(), pub2 = root.user;
            if (!pub2 || !(pub2 = pub2.is) || !(pub2 = pub2.pub)) {
              return id;
            }
            id = "~" + pub2 + "/" + id;
            if (cb && cb.call) {
              cb(null, id);
            }
            return id;
          };
          return user2;
        };
        function lex() {
          return Gun3.state().toString(36).replace(".", "");
        }
        Gun3.User = User;
        User.GUN = Gun3;
        User.SEA = Gun3.SEA = SEA;
        module3.exports = User;
      })(USE, "./user");
      ;
      USE(function(module3) {
        var u, Gun3 = "" + u != typeof window ? window.Gun || { chain: {} } : USE(("" + u === typeof MODULE ? "." : "") + "./gun", 1);
        Gun3.chain.then = function(cb, opt) {
          var gun = this, p = new Promise(function(res, rej) {
            gun.once(res, opt);
          });
          return cb ? p.then(cb) : p;
        };
      })(USE, "./then");
      ;
      USE(function(module3) {
        var User = USE("./user"), SEA = User.SEA, Gun3 = User.GUN, noop4 = function() {
        };
        User.prototype.create = function(...args) {
          var pair = typeof args[0] === "object" && (args[0].pub || args[0].epub) ? args[0] : typeof args[1] === "object" && (args[1].pub || args[1].epub) ? args[1] : null;
          var alias = pair && (pair.pub || pair.epub) ? pair.pub : typeof args[0] === "string" ? args[0] : null;
          var pass = pair && (pair.pub || pair.epub) ? pair : alias && typeof args[1] === "string" ? args[1] : null;
          var cb = args.filter((arg) => typeof arg === "function")[0] || null;
          var opt = args && args.length > 1 && typeof args[args.length - 1] === "object" ? args[args.length - 1] : {};
          var gun = this, cat = gun._, root = gun.back(-1);
          cb = cb || noop4;
          opt = opt || {};
          if (opt.check !== false) {
            var err;
            if (!alias) {
              err = "No user.";
            }
            if ((pass || "").length < 8) {
              err = "Password too short!";
            }
            if (err) {
              cb({ err: Gun3.log(err) });
              return gun;
            }
          }
          if (cat.ing) {
            (cb || noop4)({ err: Gun3.log("User is already being created or authenticated!"), wait: true });
            return gun;
          }
          cat.ing = true;
          var act = {}, u;
          act.a = function(pubs) {
            act.pubs = pubs;
            if (pubs && !opt.already) {
              var ack = { err: Gun3.log("User already created!") };
              cat.ing = false;
              (cb || noop4)(ack);
              gun.leave();
              return;
            }
            act.salt = String.random(64);
            SEA.work(pass, act.salt, act.b);
          };
          act.b = function(proof) {
            act.proof = proof;
            pair ? act.c(pair) : SEA.pair(act.c);
          };
          act.c = function(pair2) {
            var tmp;
            act.pair = pair2 || {};
            if (tmp = cat.root.user) {
              tmp._.sea = pair2;
              tmp.is = { pub: pair2.pub, epub: pair2.epub, alias };
            }
            act.data = { pub: pair2.pub };
            act.d();
          };
          act.d = function() {
            act.data.alias = alias;
            act.e();
          };
          act.e = function() {
            act.data.epub = act.pair.epub;
            SEA.encrypt({ priv: act.pair.priv, epriv: act.pair.epriv }, act.proof, act.f, { raw: 1 });
          };
          act.f = function(auth) {
            act.data.auth = JSON.stringify({ ek: auth, s: act.salt });
            act.g(act.data.auth);
          };
          act.g = function(auth) {
            var tmp;
            act.data.auth = act.data.auth || auth;
            root.get(tmp = "~" + act.pair.pub).put(act.data).on(act.h);
            var link = {};
            link[tmp] = { "#": tmp };
            root.get("~@" + alias).put(link).get(tmp).on(act.i);
          };
          act.h = function(data, key, msg, eve) {
            eve.off();
            act.h.ok = 1;
            act.i();
          };
          act.i = function(data, key, msg, eve) {
            if (eve) {
              act.i.ok = 1;
              eve.off();
            }
            if (!act.h.ok || !act.i.ok) {
              return;
            }
            cat.ing = false;
            cb({ ok: 0, pub: act.pair.pub });
            if (noop4 === cb) {
              pair ? gun.auth(pair) : gun.auth(alias, pass);
            }
          };
          root.get("~@" + alias).once(act.a);
          return gun;
        };
        User.prototype.leave = function(opt, cb) {
          var gun = this, user2 = gun.back(-1)._.user;
          if (user2) {
            delete user2.is;
            delete user2._.is;
            delete user2._.sea;
          }
          if (SEA.window) {
            try {
              var sS = {};
              sS = window.sessionStorage;
              delete sS.recall;
              delete sS.pair;
            } catch (e2) {
            }
            ;
          }
          return gun;
        };
      })(USE, "./create");
      ;
      USE(function(module3) {
        var User = USE("./user"), SEA = User.SEA, Gun3 = User.GUN, noop4 = function() {
        };
        User.prototype.auth = function(...args) {
          var pair = typeof args[0] === "object" && (args[0].pub || args[0].epub) ? args[0] : typeof args[1] === "object" && (args[1].pub || args[1].epub) ? args[1] : null;
          var alias = !pair && typeof args[0] === "string" ? args[0] : null;
          var pass = alias && typeof args[1] === "string" ? args[1] : null;
          var cb = args.filter((arg) => typeof arg === "function")[0] || null;
          var opt = args && args.length > 1 && typeof args[args.length - 1] === "object" ? args[args.length - 1] : {};
          var gun = this, cat = gun._, root = gun.back(-1);
          if (cat.ing) {
            (cb || noop4)({ err: Gun3.log("User is already being created or authenticated!"), wait: true });
            return gun;
          }
          cat.ing = true;
          var act = {}, u;
          act.a = function(data) {
            if (!data) {
              return act.b();
            }
            if (!data.pub) {
              var tmp = [];
              Object.keys(data).forEach(function(k) {
                if (k == "_") {
                  return;
                }
                tmp.push(data[k]);
              });
              return act.b(tmp);
            }
            if (act.name) {
              return act.f(data);
            }
            act.c((act.data = data).auth);
          };
          act.b = function(list) {
            var get = (act.list = (act.list || []).concat(list || [])).shift();
            if (u === get) {
              if (act.name) {
                return act.err("Your user account is not published for dApps to access, please consider syncing it online, or allowing local access by adding your device as a peer.");
              }
              return act.err("Wrong user or password.");
            }
            root.get(get).once(act.a);
          };
          act.c = function(auth) {
            if (u === auth) {
              return act.b();
            }
            if (typeof auth == "string") {
              return act.c(obj_ify(auth));
            }
            SEA.work(pass, (act.auth = auth).s, act.d, act.enc);
          };
          act.d = function(proof) {
            SEA.decrypt(act.auth.ek, proof, act.e, act.enc);
          };
          act.e = function(half) {
            if (u === half) {
              if (!act.enc) {
                act.enc = { encode: "utf8" };
                return act.c(act.auth);
              }
              act.enc = null;
              return act.b();
            }
            act.half = half;
            act.f(act.data);
          };
          act.f = function(pair2) {
            var half = act.half || {}, data = act.data || {};
            act.g(act.lol = { pub: pair2.pub || data.pub, epub: pair2.epub || data.epub, priv: pair2.priv || half.priv, epriv: pair2.epriv || half.epriv });
          };
          act.g = function(pair2) {
            if (!pair2 || !pair2.pub || !pair2.epub) {
              return act.b();
            }
            act.pair = pair2;
            var user2 = root._.user, at = user2._;
            var tmp = at.tag;
            var upt = at.opt;
            at = user2._ = root.get("~" + pair2.pub)._;
            at.opt = upt;
            user2.is = { pub: pair2.pub, epub: pair2.epub, alias: alias || pair2.pub };
            at.sea = act.pair;
            cat.ing = false;
            try {
              if (pass && u == (obj_ify(cat.root.graph["~" + pair2.pub].auth) || "")[":"]) {
                opt.shuffle = opt.change = pass;
              }
            } catch (e2) {
            }
            opt.change ? act.z() : (cb || noop4)(at);
            if (SEA.window && (gun.back("user")._.opt || opt).remember) {
              try {
                var sS = {};
                sS = window.sessionStorage;
                sS.recall = true;
                sS.pair = JSON.stringify(pair2);
              } catch (e2) {
              }
            }
            try {
              if (root._.tag.auth) {
                root._.on("auth", at);
              } else {
                setTimeout(function() {
                  root._.on("auth", at);
                }, 1);
              }
            } catch (e2) {
              Gun3.log("Your 'auth' callback crashed with:", e2);
            }
          };
          act.z = function() {
            act.salt = String.random(64);
            SEA.work(opt.change, act.salt, act.y);
          };
          act.y = function(proof) {
            SEA.encrypt({ priv: act.pair.priv, epriv: act.pair.epriv }, proof, act.x, { raw: 1 });
          };
          act.x = function(auth) {
            act.w(JSON.stringify({ ek: auth, s: act.salt }));
          };
          act.w = function(auth) {
            if (opt.shuffle) {
              console.log("migrate core account from UTF8 & shuffle");
              var tmp = {};
              Object.keys(act.data).forEach(function(k) {
                tmp[k] = act.data[k];
              });
              delete tmp._;
              tmp.auth = auth;
              root.get("~" + act.pair.pub).put(tmp);
            }
            root.get("~" + act.pair.pub).get("auth").put(auth, cb || noop4);
          };
          act.err = function(e2) {
            var ack = { err: Gun3.log(e2 || "User cannot be found!") };
            cat.ing = false;
            (cb || noop4)(ack);
          };
          act.plugin = function(name) {
            if (!(act.name = name)) {
              return act.err();
            }
            var tmp = [name];
            if (name[0] !== "~") {
              tmp[1] = "~" + name;
              tmp[2] = "~@" + name;
            }
            act.b(tmp);
          };
          if (pair) {
            act.g(pair);
          } else if (alias) {
            root.get("~@" + alias).once(act.a);
          } else if (!alias && !pass) {
            SEA.name(act.plugin);
          }
          return gun;
        };
        function obj_ify(o) {
          if (typeof o != "string") {
            return o;
          }
          try {
            o = JSON.parse(o);
          } catch (e2) {
            o = {};
          }
          ;
          return o;
        }
      })(USE, "./auth");
      ;
      USE(function(module3) {
        var User = USE("./user"), SEA = User.SEA, Gun3 = User.GUN;
        User.prototype.recall = function(opt, cb) {
          var gun = this, root = gun.back(-1), tmp;
          opt = opt || {};
          if (opt && opt.sessionStorage) {
            if (SEA.window) {
              try {
                var sS = {};
                sS = window.sessionStorage;
                if (sS) {
                  root._.opt.remember = true;
                  (gun.back("user")._.opt || opt).remember = true;
                  if (sS.recall || sS.pair)
                    root.user().auth(JSON.parse(sS.pair), cb);
                }
              } catch (e2) {
              }
            }
            return gun;
          }
          return gun;
        };
      })(USE, "./recall");
      ;
      USE(function(module3) {
        var User = USE("./user"), SEA = User.SEA, Gun3 = User.GUN, noop4 = function() {
        };
        User.prototype.pair = function() {
          var user2 = this, proxy;
          try {
            proxy = new Proxy({ DANGER: "\u2620" }, { get: function(t2, p, r2) {
              if (!user2.is || !(user2._ || "").sea) {
                return;
              }
              return user2._.sea[p];
            } });
          } catch (e2) {
          }
          return proxy;
        };
        User.prototype.delete = async function(alias, pass, cb) {
          console.log("user.delete() IS DEPRECATED AND WILL BE MOVED TO A MODULE!!!");
          var gun = this, root = gun.back(-1), user2 = gun.back("user");
          try {
            user2.auth(alias, pass, function(ack) {
              var pub = (user2.is || {}).pub;
              user2.map().once(function() {
                this.put(null);
              });
              user2.leave();
              (cb || noop4)({ ok: 0 });
            });
          } catch (e2) {
            Gun3.log("User.delete failed! Error:", e2);
          }
          return gun;
        };
        User.prototype.alive = async function() {
          console.log("user.alive() IS DEPRECATED!!!");
          const gunRoot = this.back(-1);
          try {
            await authRecall(gunRoot);
            return gunRoot._.user._;
          } catch (e2) {
            const err = "No session!";
            Gun3.log(err);
            throw { err };
          }
        };
        User.prototype.trust = async function(user2) {
          console.log("`.trust` API MAY BE DELETED OR CHANGED OR RENAMED, DO NOT USE!");
          if (Gun3.is(user2)) {
            user2.get("pub").get((ctx, ev) => {
              console.log(ctx, ev);
            });
          }
          user2.get("trust").get(path).put(theirPubkey);
        };
        User.prototype.grant = function(to, cb) {
          console.log("`.grant` API MAY BE DELETED OR CHANGED OR RENAMED, DO NOT USE!");
          var gun = this, user2 = gun.back(-1).user(), pair = user2._.sea, path2 = "";
          gun.back(function(at) {
            if (at.is) {
              return;
            }
            path2 += at.get || "";
          });
          (async function() {
            var enc, sec = await user2.get("grant").get(pair.pub).get(path2).then();
            sec = await SEA.decrypt(sec, pair);
            if (!sec) {
              sec = SEA.random(16).toString();
              enc = await SEA.encrypt(sec, pair);
              user2.get("grant").get(pair.pub).get(path2).put(enc);
            }
            var pub = to.get("pub").then();
            var epub = to.get("epub").then();
            pub = await pub;
            epub = await epub;
            var dh = await SEA.secret(epub, pair);
            enc = await SEA.encrypt(sec, dh);
            user2.get("grant").get(pub).get(path2).put(enc, cb);
          })();
          return gun;
        };
        User.prototype.secret = function(data, cb) {
          console.log("`.secret` API MAY BE DELETED OR CHANGED OR RENAMED, DO NOT USE!");
          var gun = this, user2 = gun.back(-1).user(), pair = user2.pair(), path2 = "";
          gun.back(function(at) {
            if (at.is) {
              return;
            }
            path2 += at.get || "";
          });
          (async function() {
            var enc, sec = await user2.get("trust").get(pair.pub).get(path2).then();
            sec = await SEA.decrypt(sec, pair);
            if (!sec) {
              sec = SEA.random(16).toString();
              enc = await SEA.encrypt(sec, pair);
              user2.get("trust").get(pair.pub).get(path2).put(enc);
            }
            enc = await SEA.encrypt(data, sec);
            gun.put(enc, cb);
          })();
          return gun;
        };
        module3.exports = User;
      })(USE, "./share");
      ;
      USE(function(module3) {
        var SEA = USE("./sea"), S2 = USE("./settings"), noop4 = function() {
        }, u;
        var Gun3 = "" + u != typeof window ? window.Gun || { on: noop4 } : USE(("" + u === typeof MODULE ? "." : "") + "./gun", 1);
        Gun3.on("opt", function(at) {
          if (!at.sea) {
            at.sea = { own: {} };
            at.on("put", check, at);
          }
          this.to.next(at);
        });
        function check(msg) {
          var eve = this, at = eve.as, put = msg.put, soul = put["#"], key = put["."], val = put[":"], state = put[">"], id = msg["#"], tmp;
          if (!soul || !key) {
            return;
          }
          if ((msg._ || "").faith && (at.opt || "").faith && typeof msg._ == "function") {
            SEA.opt.pack(put, function(raw) {
              SEA.verify(raw, false, function(data) {
                put["="] = SEA.opt.unpack(data);
                eve.to.next(msg);
              });
            });
            return;
          }
          var no = function(why) {
            at.on("in", { "@": id, err: msg.err = why });
          };
          (msg._ || "").DBG && ((msg._ || "").DBG.c = +new Date());
          if (0 <= soul.indexOf("<?")) {
            tmp = parseFloat(soul.split("<?")[1] || "");
            if (tmp && state < Gun3.state() - tmp * 1e3) {
              (tmp = msg._) && tmp.stun && tmp.stun--;
              return;
            }
          }
          if (soul === "~@") {
            check.alias(eve, msg, val, key, soul, at, no);
            return;
          }
          if (soul.slice(0, 2) === "~@") {
            check.pubs(eve, msg, val, key, soul, at, no);
            return;
          }
          if (tmp = SEA.opt.pub(soul)) {
            check.pub(eve, msg, val, key, soul, at, no, at.user || "", tmp);
            return;
          }
          if (0 <= soul.indexOf("#")) {
            check.hash(eve, msg, val, key, soul, at, no);
            return;
          }
          check.any(eve, msg, val, key, soul, at, no, at.user || "");
          return;
          eve.to.next(msg);
        }
        check.hash = function(eve, msg, val, key, soul, at, no) {
          SEA.work(val, null, function(data) {
            if (data && data === key.split("#").slice(-1)[0]) {
              return eve.to.next(msg);
            }
            no("Data hash not same as hash!");
          }, { name: "SHA-256" });
        };
        check.alias = function(eve, msg, val, key, soul, at, no) {
          if (!val) {
            return no("Data must exist!");
          }
          if ("~@" + key === link_is(val)) {
            return eve.to.next(msg);
          }
          no("Alias not same!");
        };
        check.pubs = function(eve, msg, val, key, soul, at, no) {
          if (!val) {
            return no("Alias must exist!");
          }
          if (key === link_is(val)) {
            return eve.to.next(msg);
          }
          no("Alias not same!");
        };
        check.pub = async function(eve, msg, val, key, soul, at, no, user2, pub) {
          var tmp;
          const raw = await S2.parse(val) || {};
          const verify = (certificate, certificant, cb) => {
            if (certificate.m && certificate.s && certificant && pub)
              return SEA.verify(certificate, pub, (data) => {
                if (u !== data && u !== data.e && msg.put[">"] && msg.put[">"] > parseFloat(data.e))
                  return no("Certificate expired.");
                if (u !== data && data.c && data.w && (data.c === certificant || data.c.indexOf("*") > -1)) {
                  let path2 = soul.indexOf("/") > -1 ? soul.replace(soul.substring(0, soul.indexOf("/") + 1), "") : "";
                  String.match = String.match || Gun3.text.match;
                  const w = Array.isArray(data.w) ? data.w : typeof data.w === "object" || typeof data.w === "string" ? [data.w] : [];
                  for (const lex of w) {
                    if (String.match(path2, lex["#"]) && String.match(key, lex["."]) || !lex["."] && String.match(path2, lex["#"]) || !lex["#"] && String.match(key, lex["."]) || String.match(path2 ? path2 + "/" + key : key, lex["#"] || lex)) {
                      if (lex["+"] && lex["+"].indexOf("*") > -1 && path2 && path2.indexOf(certificant) == -1 && key.indexOf(certificant) == -1)
                        return no(`Path "${path2}" or key "${key}" must contain string "${certificant}".`);
                      if (data.wb && (typeof data.wb === "string" || (data.wb || {})["#"])) {
                        var root = eve.as.root.$.back(-1);
                        if (typeof data.wb === "string" && data.wb.slice(0, 1) !== "~")
                          root = root.get("~" + pub);
                        return root.get(data.wb).get(certificant).once((value) => {
                          if (value && (value === 1 || value === true))
                            return no(`Certificant ${certificant} blocked.`);
                          return cb(data);
                        });
                      }
                      return cb(data);
                    }
                  }
                  return no("Certificate verification fail.");
                }
              });
            return;
          };
          if (key === "pub" && "~" + pub === soul) {
            if (val === pub)
              return eve.to.next(msg);
            return no("Account not same!");
          }
          if ((tmp = user2.is) && tmp.pub && !raw["*"] && !raw["+"] && (pub === tmp.pub || pub !== tmp.pub && ((msg._.msg || {}).opt || {}).cert)) {
            SEA.opt.pack(msg.put, (packed) => {
              SEA.sign(packed, user2._.sea, async function(data) {
                if (u === data)
                  return no(SEA.err || "Signature fail.");
                msg.put[":"] = { ":": tmp = SEA.opt.unpack(data.m), "~": data.s };
                msg.put["="] = tmp;
                if (pub === user2.is.pub) {
                  if (tmp = link_is(val))
                    (at.sea.own[tmp] = at.sea.own[tmp] || {})[pub] = 1;
                  JSON.stringifyAsync(msg.put[":"], function(err, s3) {
                    if (err) {
                      return no(err || "Stringify error.");
                    }
                    msg.put[":"] = s3;
                    return eve.to.next(msg);
                  });
                  return;
                }
                if (pub !== user2.is.pub && ((msg._.msg || {}).opt || {}).cert) {
                  const cert = await S2.parse(msg._.msg.opt.cert);
                  if (cert && cert.m && cert.s)
                    verify(cert, user2.is.pub, (_) => {
                      msg.put[":"]["+"] = cert;
                      msg.put[":"]["*"] = user2.is.pub;
                      JSON.stringifyAsync(msg.put[":"], function(err, s3) {
                        if (err) {
                          return no(err || "Stringify error.");
                        }
                        msg.put[":"] = s3;
                        return eve.to.next(msg);
                      });
                      return;
                    });
                }
              }, { raw: 1 });
            });
            return;
          }
          SEA.opt.pack(msg.put, (packed) => {
            SEA.verify(packed, raw["*"] || pub, function(data) {
              var tmp2;
              data = SEA.opt.unpack(data);
              if (u === data)
                return no("Unverified data.");
              if ((tmp2 = link_is(data)) && pub === SEA.opt.pub(tmp2))
                (at.sea.own[tmp2] = at.sea.own[tmp2] || {})[pub] = 1;
              if (raw["+"] && raw["+"]["m"] && raw["+"]["s"] && raw["*"])
                verify(raw["+"], raw["*"], (_) => {
                  msg.put["="] = data;
                  return eve.to.next(msg);
                });
              else {
                msg.put["="] = data;
                return eve.to.next(msg);
              }
            });
          });
          return;
        };
        check.any = function(eve, msg, val, key, soul, at, no, user2) {
          var tmp, pub;
          if (at.opt.secure) {
            return no("Soul missing public key at '" + key + "'.");
          }
          at.on("secure", function(msg2) {
            this.off();
            if (!at.opt.secure) {
              return eve.to.next(msg2);
            }
            no("Data cannot be changed.");
          }).on.on("secure", msg);
          return;
        };
        var valid = Gun3.valid, link_is = function(d, l) {
          return typeof (l = valid(d)) == "string" && l;
        }, state_ify = (Gun3.state || "").ify;
        var pubcut = /[^\w_-]/;
        SEA.opt.pub = function(s3) {
          if (!s3) {
            return;
          }
          s3 = s3.split("~");
          if (!s3 || !(s3 = s3[1])) {
            return;
          }
          s3 = s3.split(pubcut).slice(0, 2);
          if (!s3 || s3.length != 2) {
            return;
          }
          if ((s3[0] || "")[0] === "@") {
            return;
          }
          s3 = s3.slice(0, 2).join(".");
          return s3;
        };
        SEA.opt.stringy = function(t2) {
        };
        SEA.opt.pack = function(d, cb, k, n, s3) {
          var tmp, f3;
          if (SEA.opt.check(d)) {
            return cb(d);
          }
          if (d && d["#"] && d["."] && d[">"]) {
            tmp = d[":"];
            f3 = 1;
          }
          JSON.parseAsync(f3 ? tmp : d, function(err, meta) {
            var sig = u !== (meta || "")[":"] && (meta || "")["~"];
            if (!sig) {
              cb(d);
              return;
            }
            cb({ m: { "#": s3 || d["#"], ".": k || d["."], ":": (meta || "")[":"], ">": d[">"] || Gun3.state.is(n, k) }, s: sig });
          });
        };
        var O = SEA.opt;
        SEA.opt.unpack = function(d, k, n) {
          var tmp;
          if (u === d) {
            return;
          }
          if (d && u !== (tmp = d[":"])) {
            return tmp;
          }
          k = k || O.fall_key;
          if (!n && O.fall_val) {
            n = {};
            n[k] = O.fall_val;
          }
          if (!k || !n) {
            return;
          }
          if (d === n[k]) {
            return d;
          }
          if (!SEA.opt.check(n[k])) {
            return d;
          }
          var soul = n && n._ && n._["#"] || O.fall_soul, s3 = Gun3.state.is(n, k) || O.fall_state;
          if (d && d.length === 4 && soul === d[0] && k === d[1] && fl(s3) === fl(d[3])) {
            return d[2];
          }
          if (s3 < SEA.opt.shuffle_attack) {
            return d;
          }
        };
        SEA.opt.shuffle_attack = 15463296e5;
        var fl = Math.floor;
      })(USE, "./index");
    })();
  }
});

// .svelte-kit/output/server/chunks/Header-ed99da1d.js
function writable2(value, start = noop3) {
  let stop;
  const subscribers = new Set();
  function set(new_value) {
    if (safe_not_equal2(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue2.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue2.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue2.length; i2 += 2) {
            subscriber_queue2[i2][0](subscriber_queue2[i2 + 1]);
          }
          subscriber_queue2.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop3) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop3;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var import_gun, import_sea, subscriber_queue2, db, user, username, isAdmin, Navbar, Login, Header;
var init_Header_ed99da1d = __esm({
  ".svelte-kit/output/server/chunks/Header-ed99da1d.js"() {
    init_shims();
    init_app_825f3e98();
    import_gun = __toModule(require_gun());
    import_sea = __toModule(require_sea());
    subscriber_queue2 = [];
    db = (0, import_gun.default)({ peers: ["localhost:8000/gun"] });
    try {
      console.log("\u{1F4BB} Connected to persitency peer, welcome! \u{1F44B}");
    } catch (err) {
      console.log("\u274C Could not connect to persitency peer! \u{1F614}");
    } finally {
      console.log("Database initialization finished! \u{1F44D}");
    }
    user = db.user().recall({ sessionStorage: true });
    username = writable2("");
    isAdmin = writable2(false);
    db.on("auth", async (event) => {
      const alias = await user.get("alias");
      await user.get("admin");
      console.log(`Logging in as ${alias} \u{1F44B}`);
      username.set(alias);
    });
    username.subscribe((value) => {
      console.log(`\u{1F4BB} User state has changed to ${value} successfully \u{1F44D}`);
    });
    Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $isAdmin, $$unsubscribe_isAdmin;
      $$unsubscribe_isAdmin = subscribe(isAdmin, (value) => $isAdmin = value);
      let xD = db.back("opt.peers");
      console.log("Heya~ Heres the list of peers in the database, " + Object.keys(xD));
      $$unsubscribe_isAdmin();
      return `<div class="${"md:space-x-2 text-center md:w-max mx-auto border w-auto p-2"}"><div class="${"md:inline-block"}"><a class="${"md:inline-block cursor-pointer hover:underline"}" href="${"/"}">\u{1F3E0} Homepage</a></div>
    <div class="${"md:inline-block"}"><a class="${"md:inline-block cursor-pointer hover:underline"}" href="${"/privacy"}">\u{1F512} Privacy [WIP]</a></div>
    <div class="${"md:inline-block"}"><a class="${"md:inline-block cursor-pointer hover:underline"}" href="${"/report"}">\u{1F6A9} Report [WIP]</a></div>
    <div class="${"md:inline-block"}"><a class="${"md:inline-block cursor-pointer hover:underline"}" href="${"https://discord.gg/vZm9NenFd6"}">\u{1F388} Discord</a></div>
    ${$isAdmin ? `<div>ADMIN</div>` : ``}</div>`;
    });
    Login = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $username, $$unsubscribe_username;
      $$unsubscribe_username = subscribe(username, (value) => $username = value);
      let { usernameInput } = $$props;
      let { passwordInput } = $$props;
      if ($$props.usernameInput === void 0 && $$bindings.usernameInput && usernameInput !== void 0)
        $$bindings.usernameInput(usernameInput);
      if ($$props.passwordInput === void 0 && $$bindings.passwordInput && passwordInput !== void 0)
        $$bindings.passwordInput(passwordInput);
      $$unsubscribe_username();
      return `${!$username ? `<div class="${"border-2 rounded m-2 text-center mx-auto"}"><input class="${"bg-gray-200 shadow-inner focus:outline-none p-2 m-2 rounded"}" type="${""}" name="${"username"}" placeholder="${"username"}"${add_attribute("value", usernameInput, 0)}>
		<br>
		<input class="${"bg-gray-200 shadow-inner focus:outline-none p-2 m-2 rounded"}" type="${"password"}" name="${"password"}" placeholder="${"password"}"${add_attribute("value", passwordInput, 0)}>
		<div class="${"text-center mx-auto border-2 bg-black text-white font-bold w-max py-1 px-3 rounded border-black hover:bg-white hover:text-black m-2 cursor-pointer transition-all duration-500 "}">log in
		</div>
		<p></p>
		<div class="${"text-center mx-auto border-2 bg-black text-white font-bold w-max py-1 px-3 rounded border-black hover:bg-white hover:text-black m-2 cursor-pointer transition-all duration-500 "}">register
		</div>

		<div>${escape2("")}</div></div>` : `<div class="${"p-1 m-1 text-center border w-max mx-auto bg-black text-white"}">Hello,
		<p class="${"inline bg-black text-white p-1"}">${escape2($username)},</p>
		how&#39;s your data doing?
	</div>
	${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})}
	<div class="${"text-center mx-auto border-2 bg-black text-white w-max py-1 px-3 rounded border-black hover:bg-white hover:text-black m-2 cursor-pointer transition-all duration-500"}">Sign Out \u{1F44B}
	</div>`}`;
    });
    Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<div><div class="${"text-center text-5xl"}" style="${"font-family: 'Source Sans Pro', sans-serif;"}"><strong>Are we Transparent yet?</strong> \u{1F575}\uFE0F
	</div>
	<div class="${"md:text-center md:text-justified my-2 bg-blue-900 text-white rounded p-2 text-center sm:mx-auto"}">&quot;BrickPlanet Transparency Tracker&quot; is a tool developed by Shiggy#9764 to keep track of <strong>transparency and corporate responsibility
		</strong>
		at BrickPlanet.
		<div class="${"my-5"}">This tool utilizes data given by BrickPlanet&#39;s services and only acts as a <strong>Middleman</strong>. This website has no intention of discouraging use of
            BrickPlanet services nor encourage hate attacks.
		</div></div></div>`;
    });
  }
});

// .svelte-kit/output/server/chunks/index-cd4da402.js
var index_cd4da402_exports = {};
__export(index_cd4da402_exports, {
  default: () => Routes
});
var import_gun2, import_sea2, Routes;
var init_index_cd4da402 = __esm({
  ".svelte-kit/output/server/chunks/index-cd4da402.js"() {
    init_shims();
    init_app_825f3e98();
    init_Header_ed99da1d();
    init_ssr();
    import_gun2 = __toModule(require_gun());
    import_sea2 = __toModule(require_sea());
    Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let categories = [
        {
          id: 1,
          name: "Income",
          emojis: "\u{1F4B5}",
          description: "How much money is BrickPlanet generating?",
          updates: [
            {
              title: "December Batch #2",
              date: "2021",
              contents: "No Data."
            },
            {
              title: "December Batch #1",
              date: "2021",
              contents: "No Data."
            },
            {
              title: "Beginnings",
              date: "2021",
              contents: "Transparency Updates begin."
            }
          ]
        },
        {
          id: 0,
          name: "Expenses",
          emojis: "\u{1F4C1}",
          description: "How expensive is it to run BrickPlanet?",
          updates: [
            {
              title: "December Batch #2",
              date: "2021",
              contents: "No Data."
            },
            {
              title: "December Batch #1",
              date: "2021",
              contents: "No Data."
            },
            {
              title: "Beginnings",
              date: "2021",
              contents: "Transparency Updates begin."
            }
          ]
        }
      ];
      return `<div class="${"p-2 m-2 md:mx-auto container"}">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}
	${validate_component(Login, "Login").$$render($$result, {}, {}, {})}
	<div class="${"text-center text-4xl"}">We&#39;re not!<br>\u274C</div>
	<p class="${"border-4 rounded border-black w-auto mx-auto p-2 m-3 bg-red-500 text-white text-center italic"}">Status: BrickPlanet has not been released yet. Thus no data.</p>
	${each(categories, ({ id, name, emojis, description, updates, isOpen }, i2) => `<div class="${"border-black border-2 p-2 my-1"}"><div class="${["text-2xl text-center select-none", isOpen ? "hidden" : ""].join(" ").trim()}">${escape2(emojis)}<strong>${escape2(name)}</strong>${escape2(emojis)}</div>

			<div name="${"statusContainer"}" class="${""}"><div class="${"text-center italic font-thin"}">${escape2(description)}</div>

				${each(updates, ({ date, title, contents }, i22) => `<div><div name="${"logContainer"}" class="${"bg-gray-600 text-white m-2 p-2 "}"><div name="${"title"}" class="${"text-xl m-2"}">${escape2(title)}</div>
							<div name="${"date"}" class="${"italic font-thin m-2"}">${escape2(date)}</div>
							<div name="${"content"}" class="${"text-justified m-2"}">${escape2(contents)}</div></div>
					</div>`)}</div>
		</div>`)}</div>`;
    });
  }
});

// .svelte-kit/output/server/chunks/privacy-5954caa3.js
var privacy_5954caa3_exports = {};
__export(privacy_5954caa3_exports, {
  default: () => Privacy
});
var import_gun3, import_sea3, Privacy;
var init_privacy_5954caa3 = __esm({
  ".svelte-kit/output/server/chunks/privacy-5954caa3.js"() {
    init_shims();
    init_app_825f3e98();
    init_Header_ed99da1d();
    init_ssr();
    import_gun3 = __toModule(require_gun());
    import_sea3 = __toModule(require_sea());
    Privacy = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<div class="${"p-2 m-2 md:mx-auto container"}">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}

	${validate_component(Login, "Login").$$render($$result, {}, {}, {})}</div>`;
    });
  }
});

// .svelte-kit/output/server/chunks/report-e12af263.js
var report_e12af263_exports = {};
__export(report_e12af263_exports, {
  default: () => Report
});
var import_gun4, import_sea4, Report;
var init_report_e12af263 = __esm({
  ".svelte-kit/output/server/chunks/report-e12af263.js"() {
    init_shims();
    init_app_825f3e98();
    init_Header_ed99da1d();
    init_ssr();
    import_gun4 = __toModule(require_gun());
    import_sea4 = __toModule(require_sea());
    Report = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `<div class="${"p-2 m-2 md:mx-auto container"}">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}

	${validate_component(Login, "Login").$$render($$result, {}, {}, {})}

    <div class="${"mx-auto w-auto bg-red-600 text-white p-2 border-4 border-black text-center"}">How is your data processed? Learn it here! Upon BrickPlanet releasing we will display their ToS aswell as Privacy Conditions with a friendlier apporach.
    </div></div>`;
    });
  }
});

// .svelte-kit/output/server/chunks/app-825f3e98.js
function noop3() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal2(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop3;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
function escape2(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped2[match]);
}
function each(items, fn) {
  let str = "";
  for (let i2 = 0; i2 < items.length; i2 += 1) {
    str += fn(items[i2], i2);
  }
  return str;
}
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape2(value)) : `"${value}"`}`}`;
}
function afterUpdate() {
}
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
function set_prerendering(value) {
}
function init(settings = default_settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  const hooks = get_hooks(user_hooks);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: assets + "/_app/start-cbf5bc5b.js",
      css: [assets + "/_app/assets/start-61d1577b.css"],
      js: [assets + "/_app/start-cbf5bc5b.js", assets + "/_app/chunks/vendor-d135ee60.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => assets + "/_app/" + entry_lookup[id],
    get_stack: (error2) => String(error2),
    handle_error: (error2, request) => {
      hooks.handleError({ error: error2, request });
      error2.stack = options.get_stack(error2);
    },
    hooks,
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    prerender: true,
    read: settings.read,
    root: Root,
    service_worker: null,
    router: true,
    ssr: false,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
async function load_component(file) {
  const { entry, css: css2, js, styles } = metadata_lookup[file];
  return {
    module: await module_lookup[file](),
    entry: assets + "/_app/" + entry,
    css: css2.map((dep) => assets + "/_app/" + dep),
    js: js.map((dep) => assets + "/_app/" + dep),
    styles
  };
}
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender });
}
var current_component, escaped2, missing_component, on_destroy, css, Root, base, assets, user_hooks, template, options, default_settings, empty, manifest, get_hooks, module_lookup, metadata_lookup;
var init_app_825f3e98 = __esm({
  ".svelte-kit/output/server/chunks/app-825f3e98.js"() {
    init_shims();
    init_ssr();
    Promise.resolve();
    escaped2 = {
      '"': "&quot;",
      "'": "&#39;",
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;"
    };
    missing_component = {
      $$render: () => ""
    };
    css = {
      code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
      map: null
    };
    Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { stores } = $$props;
      let { page } = $$props;
      let { components } = $$props;
      let { props_0 = null } = $$props;
      let { props_1 = null } = $$props;
      let { props_2 = null } = $$props;
      setContext("__svelte__", stores);
      afterUpdate(stores.page.notify);
      if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
        $$bindings.stores(stores);
      if ($$props.page === void 0 && $$bindings.page && page !== void 0)
        $$bindings.page(page);
      if ($$props.components === void 0 && $$bindings.components && components !== void 0)
        $$bindings.components(components);
      if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
        $$bindings.props_0(props_0);
      if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
        $$bindings.props_1(props_1);
      if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
        $$bindings.props_2(props_2);
      $$result.css.add(css);
      {
        stores.page.set(page);
      }
      return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
        default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
          default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
        })}` : ``}`
      })}

${``}`;
    });
    base = "";
    assets = "";
    user_hooks = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      [Symbol.toStringTag]: "Module"
    });
    template = ({ head, body }) => `<!DOCTYPE html>
<html lang="en">
	<head>
		<title>BrickPlanet Transparency Tracker</title>
		<style>
			@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@700&display=swap');
		p, html, body, h1, h2, h3, h4 {
			font-family: 'Noto Sans JP', sans-serif;
		}
		
		</style>
		<meta charset="utf-8" />
		<meta name="description" content="" />
		<link rel="icon" href="/favicon.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		` + head + '\n	</head>\n	<body>\n		\n		<div id="svelte">' + body + '</div>\n		<script src="https://cdn.tailwindcss.com"><\/script>\n\n	</body>\n</html>\n';
    options = null;
    default_settings = { paths: { "base": "", "assets": "" } };
    empty = () => ({});
    manifest = {
      assets: [{ "file": "favicon.png", "size": 1571, "type": "image/png" }],
      layout: ".svelte-kit/build/components/layout.svelte",
      error: ".svelte-kit/build/components/error.svelte",
      routes: [
        {
          type: "page",
          pattern: /^\/$/,
          params: empty,
          a: [".svelte-kit/build/components/layout.svelte", "src/routes/index.svelte"],
          b: [".svelte-kit/build/components/error.svelte"]
        },
        {
          type: "page",
          pattern: /^\/privacy\/?$/,
          params: empty,
          a: [".svelte-kit/build/components/layout.svelte", "src/routes/privacy.svelte"],
          b: [".svelte-kit/build/components/error.svelte"]
        },
        {
          type: "page",
          pattern: /^\/report\/?$/,
          params: empty,
          a: [".svelte-kit/build/components/layout.svelte", "src/routes/report.svelte"],
          b: [".svelte-kit/build/components/error.svelte"]
        }
      ]
    };
    get_hooks = (hooks) => ({
      getSession: hooks.getSession || (() => ({})),
      handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
      handleError: hooks.handleError || (({ error: error2 }) => console.error(error2.stack)),
      externalFetch: hooks.externalFetch || fetch
    });
    module_lookup = {
      ".svelte-kit/build/components/layout.svelte": () => Promise.resolve().then(() => (init_layout_dbc0ba01(), layout_dbc0ba01_exports)),
      ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(() => (init_error_a32701e1(), error_a32701e1_exports)),
      "src/routes/index.svelte": () => Promise.resolve().then(() => (init_index_cd4da402(), index_cd4da402_exports)),
      "src/routes/privacy.svelte": () => Promise.resolve().then(() => (init_privacy_5954caa3(), privacy_5954caa3_exports)),
      "src/routes/report.svelte": () => Promise.resolve().then(() => (init_report_e12af263(), report_e12af263_exports))
    };
    metadata_lookup = { ".svelte-kit/build/components/layout.svelte": { "entry": "layout.svelte-eb644564.js", "css": [], "js": ["layout.svelte-eb644564.js", "chunks/vendor-d135ee60.js"], "styles": [] }, ".svelte-kit/build/components/error.svelte": { "entry": "error.svelte-cbadf136.js", "css": [], "js": ["error.svelte-cbadf136.js", "chunks/vendor-d135ee60.js"], "styles": [] }, "src/routes/index.svelte": { "entry": "pages/index.svelte-d32a5d91.js", "css": [], "js": ["pages/index.svelte-d32a5d91.js", "chunks/vendor-d135ee60.js", "chunks/Header-c601de6a.js"], "styles": [] }, "src/routes/privacy.svelte": { "entry": "pages/privacy.svelte-eb7f2579.js", "css": [], "js": ["pages/privacy.svelte-eb7f2579.js", "chunks/vendor-d135ee60.js", "chunks/Header-c601de6a.js"], "styles": [] }, "src/routes/report.svelte": { "entry": "pages/report.svelte-13cb5c61.js", "css": [], "js": ["pages/report.svelte-13cb5c61.js", "chunks/vendor-d135ee60.js", "chunks/Header-c601de6a.js"], "styles": [] } };
  }
});

// .svelte-kit/netlify/entry.js
__export(exports, {
  handler: () => handler
});
init_shims();

// .svelte-kit/output/server/app.js
init_shims();
init_ssr();
init_app_825f3e98();

// .svelte-kit/netlify/entry.js
init();
async function handler(event) {
  const { path: path2, httpMethod, headers, rawQuery, body, isBase64Encoded } = event;
  const query = new URLSearchParams(rawQuery);
  const encoding = isBase64Encoded ? "base64" : headers["content-encoding"] || "utf-8";
  const rawBody = typeof body === "string" ? Buffer.from(body, encoding) : body;
  const rendered = await render({
    method: httpMethod,
    headers,
    path: path2,
    query,
    rawBody
  });
  if (!rendered) {
    return {
      statusCode: 404,
      body: "Not found"
    };
  }
  const partial_response = {
    statusCode: rendered.status,
    ...split_headers(rendered.headers)
  };
  if (rendered.body instanceof Uint8Array) {
    return {
      ...partial_response,
      isBase64Encoded: true,
      body: Buffer.from(rendered.body).toString("base64")
    };
  }
  return {
    ...partial_response,
    body: rendered.body
  };
}
function split_headers(headers) {
  const h2 = {};
  const m2 = {};
  for (const key in headers) {
    const value = headers[key];
    const target = Array.isArray(value) ? m2 : h2;
    target[key] = value;
  }
  return {
    headers: h2,
    multiValueHeaders: m2
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */
