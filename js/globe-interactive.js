  (function () {
    "use strict";

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Constants
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    var GLOBE_W = 1400,
        GLOBE_H = 1000;
    var GLOBE_CX = GLOBE_W / 2,
        GLOBE_CY = GLOBE_H / 2;
    var RADIUS = 560;
    var DEG = Math.PI / 180;
    var GRID_STEP = 5;
    var GRID_ALPHA = 0.18;
    var DOT_RADIUS = 1.2;
    var DIM_OPACITY = 0.28;

    var SF_STEP_DUR = 7000;
    var SF_DWELL = 0.78;
    var SF_SCROLL_PER_STEP = 1000;
    var SF_IDLE_TILT = 0;
    var SF_IDLE_ROLL = 0;

    // ── Country names ──
    var COUNTRY_NAMES = {
      AF: "AFGHANISTAN",
      AL: "ALBANIA",
      DZ: "ALGERIA",
      AR: "ARGENTINA",
      AU: "AUSTRALIA",
      AT: "AUSTRIA",
      AZ: "AZERBAIJAN",
      BD: "BANGLADESH",
      BE: "BELGIUM",
      BO: "BOLIVIA",
      BR: "BRAZIL",
      BG: "BULGARIA",
      CA: "CANADA",
      CM: "CAMEROON",
      CL: "CHILE",
      CN: "CHINA",
      CO: "COLOMBIA",
      HR: "CROATIA",
      CZ: "CZECHIA",
      DK: "DENMARK",
      EC: "ECUADOR",
      EG: "EGYPT",
      ET: "ETHIOPIA",
      FI: "FINLAND",
      FR: "FRANCE",
      GE: "GEORGIA",
      DE: "GERMANY",
      GH: "GHANA",
      GR: "GREECE",
      GT: "GUATEMALA",
      HN: "HONDURAS",
      HU: "HUNGARY",
      IN: "INDIA",
      ID: "INDONESIA",
      IQ: "IRAQ",
      IE: "IRELAND",
      IL: "ISRAEL",
      IT: "ITALY",
      JP: "JAPAN",
      JO: "JORDAN",
      KZ: "KAZAKHSTAN",
      KE: "KENYA",
      KW: "KUWAIT",
      LB: "LEBANON",
      MY: "MALAYSIA",
      MX: "MEXICO",
      MA: "MOROCCO",
      MM: "MYANMAR",
      NP: "NEPAL",
      NL: "NETHERLANDS",
      NZ: "NEW ZEALAND",
      NG: "NIGERIA",
      NO: "NORWAY",
      PK: "PAKISTAN",
      PE: "PERU",
      PH: "PHILIPPINES",
      PL: "POLAND",
      PT: "PORTUGAL",
      QA: "QATAR",
      RO: "ROMANIA",
      RU: "RUSSIA",
      SA: "SAUDI ARABIA",
      RS: "SERBIA",
      SG: "SINGAPORE",
      ZA: "SOUTH AFRICA",
      KR: "SOUTH KOREA",
      ES: "SPAIN",
      LK: "SRI LANKA",
      SE: "SWEDEN",
      CH: "SWITZERLAND",
      TW: "TAIWAN",
      TZ: "TANZANIA",
      TH: "THAILAND",
      TN: "TUNISIA",
      TR: "TURKEY",
      UA: "UKRAINE",
      AE: "UNITED ARAB EMIRATES",
      GB: "UNITED KINGDOM",
      US: "UNITED STATES",
      UZ: "UZBEKISTAN",
      VE: "VENEZUELA",
      VN: "VIETNAM",
      ZW: "ZIMBABWE",
      RW: "RWANDA",
    };

    // ── Step centroids [lon, lat] ──
    var CENTROIDS = {
      AF: [67.7, 33.9],
      AL: [20.2, 41.2],
      DZ: [1.7, 28],
      AR: [-63.6, -38.4],
      AU: [133.8, -25.3],
      AT: [14.5, 47.5],
      AZ: [47.6, 40.1],
      BD: [90.4, 23.7],
      BE: [4.5, 50.5],
      BO: [-64.7, -16.3],
      BR: [-51.9, -14.2],
      BG: [25.5, 42.7],
      CA: [-96.8, 60.2],
      CL: [-71.5, -35.7],
      CN: [104.2, 35.9],
      CO: [-74.3, 4.1],
      HR: [15.2, 45.1],
      CZ: [15.5, 49.8],
      DK: [10, 56.3],
      EC: [-78.1, -1.8],
      EG: [30.8, 26.8],
      ET: [40.5, 9.1],
      FI: [26, 64],
      FR: [2.2, 46.2],
      GE: [43.4, 42.3],
      DE: [10.5, 51.1],
      GH: [-1, 8],
      GR: [21.8, 39.1],
      GT: [-90.2, 15.8],
      HU: [19.5, 47.2],
      IN: [78.9, 20.6],
      ID: [113.9, -0.8],
      IQ: [43.7, 33.2],
      IE: [-8.2, 53.4],
      IL: [34.9, 31],
      IT: [12.6, 41.9],
      JP: [138.3, 36.2],
      JO: [36.2, 31.2],
      KZ: [66.9, 48],
      KE: [37.9, 0],
      KW: [47.5, 29.3],
      LB: [35.9, 33.9],
      MY: [109.7, 4.2],
      MX: [-102.6, 24],
      MA: [-7.1, 31.8],
      MM: [96.7, 19.2],
      NP: [84.1, 28.4],
      NL: [5.3, 52.1],
      NZ: [172.5, -40.9],
      NG: [8.7, 9.1],
      NO: [8.5, 60.5],
      PK: [69.3, 30.4],
      PE: [-75, -9.2],
      PH: [122.9, 12.9],
      PL: [19.1, 52],
      PT: [-8.2, 39.6],
      QA: [51.2, 25.4],
      RO: [24.9, 45.9],
      RU: [99, 61.5],
      SA: [45.1, 24.7],
      RS: [21, 44],
      SG: [103.8, 1.4],
      ZA: [22.9, -30.6],
      KR: [127.8, 36],
      ES: [-3.7, 40.5],
      LK: [80.7, 7.9],
      SE: [18.6, 62.2],
      CH: [8.2, 46.8],
      TW: [120.9, 23.7],
      TZ: [34.9, -6.4],
      TH: [101, 15.9],
      TN: [9.6, 33.9],
      TR: [35.2, 39],
      UA: [31.4, 49],
      AE: [53.8, 23.4],
      GB: [-3.4, 55.4],
      US: [-98.5, 39.5],
      UZ: [64.6, 41.4],
      VE: [-66.6, 8],
      VN: [108.3, 14.1],
      ZW: [29.2, -20],
      RW: [29.9, -2],
    };

    // ── Cancri 满月故事墙精选（celebrate_wall_stories featured）──
    // 仅第 1 步聚焦中国（含台湾），其余步骤轮播各国
    var STEPS = [
      { code: "CN", label: "满月·深夜码农", quote: "在无数个被昂贵账单劝退的深夜，极简界面接住了我写代码的焦虑。" },
      { code: "RU", label: "满月·百年回响", quote: "多年以后，人们会想起那个满月狂欢的夜晚。" },
      { code: "DE", label: "满月·早期用户", quote: "好用，良心，透明——希望这个小站长长久久。" },
      { code: "SG", label: "满月·寻觅者", quote: "搜了无数次免费 AI，只有这里真免费、真好用。" },
      { code: "JP", label: "满月·见证者", quote: "从满是 bug 到超炫大站，一步步看着它长大。" },
      { code: "KR", label: "满月·新友", quote: "相逢恨晚，此刻只想说：你咋才来啊！" },
      { code: "IN", label: "满月·学生", quote: "挺良心的，帮我完成了许多课设。" },
      { code: "US", label: "满月·论文党", quote: "被无数韭菜站骗过后，到这里觉得得偿所愿。" },
      { code: "FR", label: "满月·社区", quote: "中转站竞争激烈，希望站长一直坚挺，奥利给！" },
      { code: "AU", label: "满月·折腾党", quote: "让菜鸡自己弄 Codex，最高失败率 95%+，情绪还算稳定。" },
    ];

    // ── ISO 3166-1 numeric → alpha-2 mapping ──
    var ISO_NUM = {
      "004": "AF",
      "008": "AL",
      "012": "DZ",
      "032": "AR",
      "036": "AU",
      "040": "AT",
      "031": "AZ",
      "050": "BD",
      "056": "BE",
      "068": "BO",
      "076": "BR",
      100: "BG",
      124: "CA",
      120: "CM",
      152: "CL",
      156: "CN",
      170: "CO",
      191: "HR",
      203: "CZ",
      208: "DK",
      218: "EC",
      818: "EG",
      231: "ET",
      246: "FI",
      250: "FR",
      268: "GE",
      276: "DE",
      288: "GH",
      300: "GR",
      320: "GT",
      340: "HN",
      348: "HU",
      356: "IN",
      360: "ID",
      368: "IQ",
      372: "IE",
      376: "IL",
      380: "IT",
      392: "JP",
      400: "JO",
      398: "KZ",
      404: "KE",
      414: "KW",
      422: "LB",
      458: "MY",
      484: "MX",
      504: "MA",
      104: "MM",
      524: "NP",
      528: "NL",
      554: "NZ",
      566: "NG",
      578: "NO",
      586: "PK",
      604: "PE",
      608: "PH",
      616: "PL",
      620: "PT",
      634: "QA",
      642: "RO",
      643: "RU",
      682: "SA",
      688: "RS",
      702: "SG",
      710: "ZA",
      410: "KR",
      724: "ES",
      144: "LK",
      752: "SE",
      756: "CH",
      158: "TW",
      834: "TZ",
      764: "TH",
      788: "TN",
      792: "TR",
      804: "UA",
      784: "AE",
      826: "GB",
      840: "US",
      860: "UZ",
      862: "VE",
      704: "VN",
      716: "ZW",
      646: "RW",
    };

    // ── FIPS → postal for US states ──
    var FIPS = {
      "01": "AL",
      "04": "AZ",
      "05": "AR",
      "06": "CA",
      "08": "CO",
      "09": "CT",
      10: "DE",
      11: "DC",
      12: "FL",
      13: "GA",
      16: "ID",
      17: "IL",
      18: "IN",
      19: "IA",
      20: "KS",
      21: "KY",
      22: "LA",
      23: "ME",
      24: "MD",
      25: "MA",
      26: "MI",
      27: "MN",
      28: "MS",
      29: "MO",
      30: "MT",
      31: "NE",
      32: "NV",
      33: "NH",
      34: "NJ",
      35: "NM",
      36: "NY",
      37: "NC",
      38: "ND",
      39: "OH",
      40: "OK",
      41: "OR",
      42: "PA",
      44: "RI",
      45: "SC",
      46: "SD",
      47: "TN",
      48: "TX",
      49: "UT",
      50: "VT",
      51: "VA",
      53: "WA",
      54: "WV",
      55: "WI",
      56: "WY",
    };
    var US_EXCLUDE = new Set(["Alaska", "Hawaii", "Puerto Rico", "Guam", "United States Virgin Islands", "American Samoa", "Commonwealth of the Northern Mariana Islands"]);

    // ── Synthetic respondent data ──
    var BY_COUNTRY = {
      US: { n: 27000, sentiment: 0.62 },
      CA: { n: 2100, sentiment: 0.65 },
      GB: { n: 2900, sentiment: 0.58 },
      DE: { n: 1800, sentiment: 0.55 },
      FR: { n: 1200, sentiment: 0.54 },
      AU: { n: 1400, sentiment: 0.63 },
      IN: { n: 2300, sentiment: 0.72 },
      BR: { n: 1000, sentiment: 0.68 },
      JP: { n: 780, sentiment: 0.48 },
      KR: { n: 580, sentiment: 0.52 },
      MX: { n: 520, sentiment: 0.6 },
      IT: { n: 460, sentiment: 0.53 },
      ES: { n: 420, sentiment: 0.56 },
      NL: { n: 390, sentiment: 0.58 },
      SE: { n: 330, sentiment: 0.6 },
      CH: { n: 290, sentiment: 0.57 },
      AT: { n: 260, sentiment: 0.55 },
      PL: { n: 250, sentiment: 0.59 },
      NO: { n: 230, sentiment: 0.62 },
      DK: { n: 210, sentiment: 0.61 },
      FI: { n: 200, sentiment: 0.63 },
      IE: { n: 180, sentiment: 0.6 },
      PT: { n: 160, sentiment: 0.54 },
      BE: { n: 160, sentiment: 0.55 },
      NZ: { n: 150, sentiment: 0.64 },
      IL: { n: 140, sentiment: 0.5 },
      RO: { n: 130, sentiment: 0.58 },
      CZ: { n: 120, sentiment: 0.56 },
      HU: { n: 120, sentiment: 0.54 },
      GR: { n: 110, sentiment: 0.5 },
      UA: { n: 100, sentiment: 0.48 },
      TR: { n: 100, sentiment: 0.52 },
      ZA: { n: 90, sentiment: 0.6 },
      AR: { n: 80, sentiment: 0.62 },
      CL: { n: 80, sentiment: 0.58 },
      CO: { n: 70, sentiment: 0.63 },
      PH: { n: 60, sentiment: 0.68 },
      SG: { n: 60, sentiment: 0.65 },
      MY: { n: 50, sentiment: 0.62 },
      TH: { n: 50, sentiment: 0.64 },
      ID: { n: 40, sentiment: 0.66 },
      PK: { n: 30, sentiment: 0.58 },
      NG: { n: 30, sentiment: 0.7 },
      EG: { n: 30, sentiment: 0.55 },
      KE: { n: 30, sentiment: 0.72 },
      AL: { n: 20, sentiment: 0.6 },
      RU: { n: 130, sentiment: 0.45 },
      CN: { n: 2200, sentiment: 0.58 },
      TW: { n: 500, sentiment: 0.58 },
      VN: { n: 40, sentiment: 0.65 },
      AE: { n: 50, sentiment: 0.62 },
      SA: { n: 50, sentiment: 0.55 },
      JO: { n: 20, sentiment: 0.52 },
      GT: { n: 20, sentiment: 0.58 },
      MA: { n: 30, sentiment: 0.56 },
      DZ: { n: 20, sentiment: 0.54 },
    };

    var BY_STATE = {
      CA: { n: 3280, sentiment: 0.6 },
      TX: { n: 2460, sentiment: 0.58 },
      FL: { n: 1910, sentiment: 0.56 },
      NY: { n: 1640, sentiment: 0.62 },
      PA: { n: 1090, sentiment: 0.55 },
      IL: { n: 1090, sentiment: 0.58 },
      OH: { n: 980, sentiment: 0.54 },
      GA: { n: 900, sentiment: 0.57 },
      NC: { n: 870, sentiment: 0.56 },
      MI: { n: 820, sentiment: 0.55 },
      NJ: { n: 770, sentiment: 0.59 },
      VA: { n: 720, sentiment: 0.6 },
      WA: { n: 660, sentiment: 0.63 },
      AZ: { n: 620, sentiment: 0.57 },
      MA: { n: 600, sentiment: 0.62 },
      TN: { n: 570, sentiment: 0.53 },
      IN: { n: 560, sentiment: 0.54 },
      MO: { n: 510, sentiment: 0.53 },
      MD: { n: 510, sentiment: 0.6 },
      WI: { n: 480, sentiment: 0.55 },
      CO: { n: 480, sentiment: 0.63 },
      MN: { n: 470, sentiment: 0.59 },
      SC: { n: 430, sentiment: 0.54 },
      AL: { n: 400, sentiment: 0.52 },
      LA: { n: 380, sentiment: 0.53 },
      KY: { n: 360, sentiment: 0.52 },
      OR: { n: 350, sentiment: 0.62 },
      OK: { n: 330, sentiment: 0.52 },
      CT: { n: 300, sentiment: 0.59 },
      UT: { n: 270, sentiment: 0.58 },
      IA: { n: 260, sentiment: 0.55 },
      NV: { n: 260, sentiment: 0.57 },
      AR: { n: 250, sentiment: 0.52 },
      MS: { n: 250, sentiment: 0.51 },
      KS: { n: 240, sentiment: 0.54 },
      NM: { n: 170, sentiment: 0.56 },
      NE: { n: 160, sentiment: 0.55 },
      ID: { n: 160, sentiment: 0.56 },
      WV: { n: 140, sentiment: 0.5 },
      ME: { n: 120, sentiment: 0.58 },
      NH: { n: 120, sentiment: 0.59 },
      MT: { n: 90, sentiment: 0.56 },
      RI: { n: 90, sentiment: 0.58 },
      DE: { n: 80, sentiment: 0.58 },
      SD: { n: 60, sentiment: 0.54 },
      ND: { n: 60, sentiment: 0.55 },
      VT: { n: 50, sentiment: 0.6 },
      WY: { n: 50, sentiment: 0.54 },
      DC: { n: 60, sentiment: 0.65 },
    };

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Projection engine
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    var _R = RADIUS;
    var _sinLat = 0,
        _cosLat = 1,
        _sinRoll = 0,
        _cosRoll = 1,
        _lon0 = 0;

    function setRotation(lon, lat, roll) {
      _lon0 = lon * DEG;
      var l = lat * DEG,
          r = roll * DEG;
      _sinLat = Math.sin(l);
      _cosLat = Math.cos(l);
      _sinRoll = Math.sin(r);
      _cosRoll = Math.cos(r);
    }

    function project(lon, lat) {
      var λ = lon * DEG - _lon0,
          φ = lat * DEG;
      var cosφ = Math.cos(φ),
          sinφ = Math.sin(φ);
      var cosλ = Math.cos(λ),
          sinλ = Math.sin(λ);
      var x = cosφ * cosλ,
          y = cosφ * sinλ,
          z = sinφ;
      var nx = x * _cosLat + z * _sinLat;
      var nz = -x * _sinLat + z * _cosLat;
      var ry = y * _cosRoll - nz * _sinRoll;
      var rz = y * _sinRoll + nz * _cosRoll;
      return [GLOBE_CX + _R * ry, GLOBE_CY - _R * rz, nx];
    }

    function projectLine(coords, front) {
      var d = "",
          wasVis = false,
          prevPt = null;
      for (var i = 0; i < coords.length; i++) {
        var pt = project(coords[i][0], coords[i][1]);
        var vis = front ? pt[2] > 0.001 : pt[2] < -0.001;
        if (vis && !wasVis) {
          if (prevPt) {
            var t = -prevPt[2] / (pt[2] - prevPt[2]);
            var hx = prevPt[0] + (pt[0] - prevPt[0]) * t;
            var hy = prevPt[1] + (pt[1] - prevPt[1]) * t;
            d += "M" + hx.toFixed(1) + " " + hy.toFixed(1) + "L" + pt[0].toFixed(1) + " " + pt[1].toFixed(1);
          } else {
            d += "M" + pt[0].toFixed(1) + " " + pt[1].toFixed(1);
          }
        } else if (vis && wasVis) {
          d += "L" + pt[0].toFixed(1) + " " + pt[1].toFixed(1);
        } else if (!vis && wasVis && prevPt) {
          var t2 = -prevPt[2] / (pt[2] - prevPt[2]);
          d += "L" + (prevPt[0] + (pt[0] - prevPt[0]) * t2).toFixed(1) + " " + (prevPt[1] + (pt[1] - prevPt[1]) * t2).toFixed(1);
        }
        wasVis = vis;
        prevPt = pt;
      }
      return d;
    }

    function projectRing(coords) {
      var closed = coords[coords.length - 1][0] === coords[0][0] && coords[coords.length - 1][1] === coords[0][1];
      var ring = closed ? coords : coords.concat([coords[0]]);
      return projectLine(ring, true);
    }

    function geoPath(geom) {
      if (!geom) return "";
      var t = geom.type;
      if (t === "LineString") return projectLine(geom.coordinates, true);
      if (t === "MultiLineString")
        return geom.coordinates
          .map(function (c) {
          return projectLine(c, true);
        })
          .join("");
      if (t === "Polygon") return geom.coordinates.map(projectRing).join("");
      if (t === "MultiPolygon")
        return geom.coordinates
          .map(function (p) {
          return p.map(projectRing).join("");
        })
          .join("");
      if (t === "GeometryCollection") return geom.geometries.map(geoPath).join("");
      return "";
    }

    // ── Graticule ──
    var SAMPLE = 2;
    function makeMeridian(lon) {
      var pts = [];
      for (var lat = -90; lat <= 90; lat += SAMPLE) pts.push([lon, lat]);
      return pts;
    }
    function makeParallel(lat) {
      var pts = [];
      for (var lon = -180; lon <= 180; lon += SAMPLE) pts.push([lon, lat]);
      return pts;
    }
    function buildGraticules(step) {
      var lines = [];
      for (var lon = -180; lon < 180; lon += step) lines.push(makeMeridian(lon));
      var pLat = Math.floor(85 / step) * step;
      for (var lat = -pLat; lat <= pLat; lat += step) lines.push(makeParallel(lat));
      return lines;
    }
    var gridLines = buildGraticules(GRID_STEP);
    var boldLines = [makeParallel(0)];

    // ── Label longitudes ──
    var labelLons = [];
    for (var ln = -180; ln < 180; ln += 30) labelLons.push(ln);

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Dot generation
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    function makeLcg(seed) {
      var s = seed >>> 0;
      return function () {
        s = (s * 1664525 + 1013904223) >>> 0;
        return (s >>> 0) / 0xffffffff;
      };
    }

    function pointInRing(lon, lat, ring) {
      var inside = false;
      for (var i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        var xi = ring[i][0],
            yi = ring[i][1],
            xj = ring[j][0],
            yj = ring[j][1];
        if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) inside = !inside;
      }
      return inside;
    }

    function pointInGeom(lon, lat, geom) {
      if (geom.type === "Polygon") {
        return (
          pointInRing(lon, lat, geom.coordinates[0]) &&
          !geom.coordinates.slice(1).some(function (h) {
            return pointInRing(lon, lat, h);
          })
        );
      }
      if (geom.type === "MultiPolygon") {
        return geom.coordinates.some(function (poly) {
          return (
            pointInRing(lon, lat, poly[0]) &&
            !poly.slice(1).some(function (h) {
              return pointInRing(lon, lat, h);
            })
          );
        });
      }
      return false;
    }

    function geomBounds(geom) {
      var minLon = Infinity,
          minLat = Infinity,
          maxLon = -Infinity,
          maxLat = -Infinity;
      function visit(c) {
        if (typeof c[0] === "number") {
          if (c[0] < minLon) minLon = c[0];
          if (c[0] > maxLon) maxLon = c[0];
          if (c[1] < minLat) minLat = c[1];
          if (c[1] > maxLat) maxLat = c[1];
        } else c.forEach(visit);
      }
      visit(geom.coordinates);
      return [minLon, minLat, maxLon, maxLat];
    }

    function sampleInGeom(geom, count, rng) {
      var b = geomBounds(geom);
      var pts = [],
          max = count * 60;
      for (var i = 0; pts.length < count && i < max; i++) {
        var lon = b[0] + rng() * (b[2] - b[0]);
        var sinMin = Math.sin(b[1] * DEG),
            sinMax = Math.sin(b[3] * DEG);
        var lat = Math.asin(sinMin + rng() * (sinMax - sinMin)) / DEG;
        if (pointInGeom(lon, lat, geom)) pts.push([lon, lat]);
      }
      return pts;
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Globe state
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    var countryMesh = null;
    var countryFeatures = null;
    var stateMesh = null;
    var dots = null;
    var dotCountries = null;
    var hoverRegions = null;

    var rotation = [0, SF_IDLE_TILT, SF_IDLE_ROLL];
    var countriesReady = false;

    // ── DOM refs ──
    var $frontGrid = document.getElementById("front-grid");
    var $boldGrid = document.getElementById("bold-grid");
    var $backGrid = document.getElementById("back-grid");
    var $countries = document.getElementById("countries");
    var $countryFill = document.getElementById("country-fill");
    var $states = document.getElementById("states");
    var $hoverOutline = document.getElementById("hover-outline");
    var $focusOutline = document.getElementById("focus-outline");
    var $glow = document.getElementById("glow");
    var $glowClipPath = document.getElementById("glow-clip-path");
    var $dotsDim = document.getElementById("dots-dim");
    var $dotsFade = document.getElementById("dots-fade");
    var $dotsMain = document.getElementById("dots-main");
    var $dotsGreen = document.getElementById("dots-green");
    var $dotsBlue = document.getElementById("dots-blue");
    var $dotsGreenP = document.getElementById("dots-green-pulse");
    var $dotsBlueP = document.getElementById("dots-blue-pulse");
    var $labels = document.getElementById("labels");
    var $quoteText = document.getElementById("quote-text");
    var $countryLabel = document.getElementById("country-label");
    var $stepDotsWrap = document.getElementById("step-dots");

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Render
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    function renderLabels() {}

    var currentFocusISO = null;
    var focusRegion = null;

    function render(focusIdx, prevFocusIdx, focusAlpha) {
      _R = RADIUS;
      setRotation(rotation[0], rotation[1], rotation[2]);

      $frontGrid.setAttribute(
        "d",
        gridLines
        .map(function (l) {
          return projectLine(l, true);
        })
        .join(""),
      );
      $boldGrid.setAttribute(
        "d",
        boldLines
        .map(function (l) {
          return projectLine(l, true);
        })
        .join(""),
      );
      $backGrid.setAttribute("d", "");

      if (countryMesh) {
        $countries.setAttribute("d", geoPath(countryMesh));
      }
      if (stateMesh) {
        $states.setAttribute("d", geoPath(stateMesh));
      }

      // Focus outline + glow
      if (focusRegion) {
        var fd = "";
        for (var ri = 0; ri < focusRegion.rings.length; ri++) fd += projectRing(focusRegion.rings[ri]);
        $focusOutline.setAttribute("d", fd);
        $focusOutline.setAttribute("stroke-opacity", String(focusAlpha));
        $glow.setAttribute("d", fd);
        $glow.setAttribute("stroke-opacity", String(focusAlpha * 0.25));
        if ($glowClipPath) $glowClipPath.setAttribute("d", fd);
      } else {
        $focusOutline.setAttribute("d", "");
        $glow.setAttribute("d", "");
        if ($glowClipPath) $glowClipPath.setAttribute("d", "");
      }

      // Dots
      if (dots) {
        var dBase = "",
            dDim = "",
            dFade = "";
        for (var i = 0; i < dots.length; i++) {
          var dot = dots[i];
          var pt = project(dot[0], dot[1]);
          if (pt[2] <= 0) continue;
          var seg = "M" + pt[0].toFixed(1) + " " + pt[1].toFixed(1) + "h0";
          var cIdx = dot[3];

          if (focusIdx >= 0 && cIdx !== undefined) {
            dDim += seg;
            if (cIdx === focusIdx) dBase += seg;
            else if (cIdx === prevFocusIdx) dFade += seg;
            continue;
          }
          dDim += seg;
        }
        $dotsMain.setAttribute("d", dBase);
        $dotsDim.setAttribute("d", dDim);
        $dotsFade.setAttribute("d", dFade);
        $dotsMain.setAttribute("stroke-opacity", String(0.8 * focusAlpha));
        $dotsFade.setAttribute("stroke-opacity", String(0.8 * (1 - focusAlpha)));
      }

      renderLabels();
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Typewriter
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    var twTimer = null;
    var twStepIdx = null;
    var typewriterDone = true;

    function typewrite(text) {
      if (twTimer) {
        clearTimeout(twTimer);
        twTimer = null;
      }
      typewriterDone = false;
      $quoteText.innerHTML = '<span class="sf-tw-cursor sf-blinking"></span>';
      twTimer = setTimeout(function () {
        $quoteText.innerHTML = '\u201c<span id="sf-tw-text"></span><span class="sf-tw-cursor sf-blinking"></span>';
        var span = document.getElementById("sf-tw-text");
        if (!span) return;
        var i = 0;
        function tick() {
          if (i >= text.length) {
            typewriterDone = true;
            return;
          }
          span.textContent += text[i++];
          twTimer = setTimeout(tick, 15);
        }
        tick();
      }, 1800);
    }

    function clearTypewriter() {
      if (twTimer) {
        clearTimeout(twTimer);
        twTimer = null;
      }
      twStepIdx = null;
      typewriterDone = true;
      $quoteText.innerHTML = "";
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Step dots UI
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    var stepDotEls = [];
    function buildStepDots() {
      $stepDotsWrap.innerHTML = "";
      stepDotEls = [];
      for (var i = 0; i < STEPS.length; i++) {
        var dot = document.createElement("div");
        dot.className = "step-dot";
        dot.dataset.idx = String(i);
        dot.addEventListener("click", function (e) {
          jumpToStep(parseInt(e.target.dataset.idx, 10));
        });
        $stepDotsWrap.appendChild(dot);
        stepDotEls.push(dot);
      }
    }
    buildStepDots();

    function updateStepDotActive(idx) {
      for (var i = 0; i < stepDotEls.length; i++) {
        if (i === idx) stepDotEls[i].classList.add("active");
        else stepDotEls[i].classList.remove("active");
      }
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Animation loop (Phase 1)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    var sfLerp = function (a, b, t) {
      return a + (b - a) * t;
    };
    var sfEase = function (t) {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    };
    var sfClamp = function (x, a, b) {
      return Math.max(a, Math.min(b, x));
    };
    function sfLonDelta(from, to) {
      return ((((to - from) % 360) + 540) % 360) - 180;
    }

    var focusIndices = {};
    var TILT_OFF = 1.6;
    var targets = STEPS.map(function (s) {
      var c = CENTROIDS[s.code] || [0, 0];
      return [c[0], c[1] + TILT_OFF];
    });

    var curLon = targets[0][0];
    var curLat = targets[0][1];
    var curMix = 1;
    var virtual = 0;
    var autoStart = null;
    var autoOffset = 0;
    var lastRenderedStep = -1;
    var stepIdx = -1;
    var prevStepIdx = -1;
    var lastTypingDone = true;
    var manualJump = false;
    var EASE = 0.06;
    var animReady = false;
    var scrollDrive = false;
    var scrollVirtual = 0;

    window.CancriGlobe = {
      setScrollProgress: function (progress) {
        scrollDrive = true;
        var totalVirtual = STEPS.length * SF_SCROLL_PER_STEP;
        scrollVirtual = Math.max(0, Math.min(1, progress)) * totalVirtual;
        virtual = scrollVirtual;
        autoStart = null;
        manualJump = true;
      },
      releaseScroll: function () {
        scrollDrive = false;
        autoStart = null;
      },
      jumpToStep: function (i) {
        jumpToStep(i);
        scrollDrive = false;
        autoStart = null;
      },
    };

    function jumpToStep(i) {
      virtual = i * SF_SCROLL_PER_STEP;
      autoStart = null;
      typewriterDone = true;
      manualJump = true;
    }

    function loop(ts) {
      if (!animReady) {
        requestAnimationFrame(loop);
        return;
      }

      var totalVirtual = STEPS.length * SF_SCROLL_PER_STEP;

      if (scrollDrive) {
        virtual = scrollVirtual;
      } else {
        if (autoStart === null) {
          autoStart = ts;
          autoOffset = virtual;
        }

        var wasManualJump = manualJump;
        if (wasManualJump) manualJump = false;

        if (!typewriterDone) {
          autoStart = ts;
          autoOffset = virtual;
        } else if (!lastTypingDone && !wasManualJump) {
          var postDwellMs = 800;
          var skipFrac = Math.max(0, SF_DWELL - postDwellMs / SF_STEP_DUR);
          autoOffset = lastRenderedStep * SF_SCROLL_PER_STEP + skipFrac * SF_SCROLL_PER_STEP;
          autoStart = ts;
          virtual = autoOffset;
        }
        if (wasManualJump) lastTypingDone = true;
        else lastTypingDone = typewriterDone;

        virtual = autoOffset + ((ts - autoStart) / SF_STEP_DUR) * SF_SCROLL_PER_STEP;
        virtual = ((virtual % totalVirtual) + totalVirtual) % totalVirtual;
      }

      var stepFloat = virtual / SF_SCROLL_PER_STEP;
      var i = sfClamp(Math.floor(stepFloat), 0, STEPS.length - 1);
      var j = (i + 1) % STEPS.length;
      var frac = sfClamp(stepFloat - i, 0, 1);
      var t = sfEase(Math.max(0, (frac - SF_DWELL) / (1 - SF_DWELL)));
      var lon0 = targets[i][0],
          lat0 = targets[i][1];
      var lon1 = targets[j][0],
          lat1 = targets[j][1];
      var wantLon = lon0 + sfLonDelta(lon0, lon1) * t;
      var wantLat = sfLerp(lat0, lat1, t);

      if (i !== lastRenderedStep) {
        var prev = lastRenderedStep;
        lastRenderedStep = i;
        if (prev >= 0) curMix = 0;
        prevStepIdx = prev;
        stepIdx = i;

        // Update UI
        updateStepDotActive(i);
        var step = STEPS[i];
        $countryLabel.innerHTML = '<span class="hl-yellow">' + step.label + "</span>";

        // Trigger typewriter
        if (scrollDrive) {
          if (twTimer) {
            clearTimeout(twTimer);
            twTimer = null;
          }
          typewriterDone = true;
          $quoteText.textContent = "\u201c" + step.quote + "\u201d";
        } else if (twStepIdx !== i) {
          twStepIdx = i;
          typewrite(step.quote);
        }

        // Update focus region
        currentFocusISO = step.code;
        focusRegion = null;
        if (hoverRegions) {
          for (var r = 0; r < hoverRegions.length; r++) {
            if (hoverRegions[r].key === step.code) {
              focusRegion = hoverRegions[r];
              break;
            }
          }
        }
      }

      // Ease rotation
      curLon += sfLonDelta(curLon, wantLon) * EASE;
      curLat += (wantLat - curLat) * EASE;
      rotation[0] = curLon;
      rotation[1] = curLat;
      rotation[2] = SF_IDLE_ROLL;

      // Focus crossfade
      curMix += (1 - curMix) * (EASE * 1.5);

      var currentFocusIdx = stepIdx >= 0 ? (focusIndices[STEPS[stepIdx].code] !== undefined ? focusIndices[STEPS[stepIdx].code] : -1) : -1;
      var prevFocusIdxVal = prevStepIdx >= 0 && STEPS[prevStepIdx] ? (focusIndices[STEPS[prevStepIdx].code] !== undefined ? focusIndices[STEPS[prevStepIdx].code] : -1) : -1;

      render(currentFocusIdx, prevFocusIdxVal, curMix);

      requestAnimationFrame(loop);
    }

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // Data loading
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

    var WORLD_URL = "https://cdn.prod.website-files.com/67ce28cfec624e2b733f8a52/69bad657e55cf57c0c2b1c89_countries-110m%202.txt";
    var US_STATES_URL = "https://cdn.prod.website-files.com/67ce28cfec624e2b733f8a52/69bad6578b4b6af7746b9171_states-10m%202.txt";

    function init() {
      // Kick off animation loop immediately (it will wait for animReady)
      requestAnimationFrame(loop);

      // Load world + US states in parallel
      Promise.all([
        fetch(WORLD_URL).then(function (r) {
          return r.json();
        }),
        fetch(US_STATES_URL).then(function (r) {
          return r.json();
        }),
      ]).then(function (results) {
        var world = results[0];
        var usTopo = results[1];

        // Parse world
        var worldObj = world.objects.countries || world.objects[Object.keys(world.objects)[0]];
        countryMesh = topojson.mesh(world, worldObj);
        var features = topojson.feature(world, worldObj).features;
        countryFeatures = features;

        // Build feature map by ISO alpha-2
        var featureMap = {};
        features.forEach(function (f) {
          var numId = String(f.id).padStart(3, "0");
          var iso = ISO_NUM[numId];
          if (iso) {
            f._iso = iso;
            featureMap[iso] = f;
          }
        });

        // Parse US states
        var stObj = usTopo.objects.states || usTopo.objects[Object.keys(usTopo.objects)[0]];
        stateMesh = topojson.mesh(usTopo, stObj);
        var stateFeatures = topojson.feature(usTopo, stObj).features;

        // Build hover regions
        var regions = [];
        var byCountry = BY_COUNTRY;
        features.forEach(function (f) {
          if (!f.geometry || !f._iso) return;
          var entry = byCountry[f._iso];
          if (!entry) return;
          var rings = [];
          var g = f.geometry;
          if (g.type === "Polygon") rings.push(g.coordinates[0]);
          else if (g.type === "MultiPolygon")
            g.coordinates.forEach(function (poly) {
              rings.push(poly[0]);
            });
          if (!rings.length) return;
          regions.push({
            key: f._iso,
            name: COUNTRY_NAMES[f._iso] || f.properties.name || f._iso,
            n: entry.n,
            rings: rings,
          });
        });
        // 中国高亮包含台湾（地图数据里 TW 是独立区块）
        var cnRegion = null,
            twRegion = null;
        for (var ri = 0; ri < regions.length; ri++) {
          if (regions[ri].key === "CN") cnRegion = regions[ri];
          if (regions[ri].key === "TW") twRegion = regions[ri];
        }
        if (cnRegion && twRegion) {
          cnRegion.rings = cnRegion.rings.concat(twRegion.rings);
          cnRegion.n += twRegion.n;
          regions = regions.filter(function (r) {
            return r.key !== "TW";
          });
        }
        hoverRegions = regions;

        // Generate dots
        var isoList = Object.keys(byCountry);
        var allDots = [];

        // Non-US countries
        isoList.forEach(function (iso, countryIdx) {
          if (iso === "US") return;
          var r = byCountry[iso];
          if (!r || !r.n || r.sentiment == null) return;
          var feature = featureMap[iso];
          if (!feature || !feature.geometry) return;

          var targetDots = Math.max(1, Math.round(r.n / 4));
          var nGreen = Math.round(r.sentiment * targetDots);
          var nBlue = targetDots - nGreen;
          var seed = iso
          .toLowerCase()
          .split("")
          .reduce(function (s, c) {
            return (s * 31 + c.charCodeAt(0)) & 0xffffffff;
          }, 0);
          var rng = makeLcg(seed);
          var dotIdx = iso === "TW" ? isoList.indexOf("CN") : countryIdx;

          sampleInGeom(feature.geometry, nGreen, rng).forEach(function (pt) {
            allDots.push([pt[0], pt[1], 0, dotIdx]);
          });
          sampleInGeom(feature.geometry, nBlue, rng).forEach(function (pt) {
            allDots.push([pt[0], pt[1], 1, dotIdx]);
          });
        });

        // US: per state
        var usIdx = isoList.indexOf("US");
        stateFeatures.forEach(function (sf) {
          var fips = String(sf.id).padStart(2, "0");
          var postal = FIPS[fips];
          if (!postal) return;
          if (US_EXCLUDE.has(sf.properties && sf.properties.name)) return;

          var stateInfo = BY_STATE[postal];
          if (!stateInfo || !stateInfo.n || stateInfo.sentiment == null) return;

          var targetDots = Math.max(1, Math.round(stateInfo.n / 4));
          var nGreen = Math.round(stateInfo.sentiment * targetDots);
          var nBlue = targetDots - nGreen;
          var seed = postal
          .toLowerCase()
          .split("")
          .reduce(function (s, c) {
            return (s * 31 + c.charCodeAt(0)) & 0xffffffff;
          }, 0);
          var rng = makeLcg(seed);

          sampleInGeom(sf.geometry, nGreen, rng).forEach(function (pt) {
            allDots.push([pt[0], pt[1], 0, usIdx]);
          });
          sampleInGeom(sf.geometry, nBlue, rng).forEach(function (pt) {
            allDots.push([pt[0], pt[1], 1, usIdx]);
          });
        });

        dots = allDots;
        dotCountries = isoList;

        // Build focus indices
        STEPS.forEach(function (s) {
          focusIndices[s.code] = isoList.indexOf(s.code);
        });

        // Show countries
        countriesReady = true;
        $countries.style.opacity = "1";
        $states.style.opacity = "1";

        // Re-set focus region for current step now that hoverRegions are available
        if (stepIdx >= 0 && STEPS[stepIdx]) {
          currentFocusISO = STEPS[stepIdx].code;
          focusRegion = null;
          for (var fr = 0; fr < hoverRegions.length; fr++) {
            if (hoverRegions[fr].key === currentFocusISO) {
              focusRegion = hoverRegions[fr];
              break;
            }
          }
        }

        // Prime rotation and start
        curLon = targets[0][0];
        curLat = targets[0][1];
        animReady = true;
      });
    }

    init();
  })();