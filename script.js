const PRESETS = {
    "fruits": {
        "apple": {"temp": 135, "time": "30-45 minutes", "thickness": "1/4 inch"},
        "banana": {"temp": 135, "time": "45-60 minutes", "thickness": "1/4 inch"},
        "strawberry": {"temp": 135, "time": "30-45 minutes", "thickness": "1/2 inch"},
        "mango": {"temp": 135, "time": "45-60 minutes", "thickness": "1/4 inch"},
        "pineapple": {"temp": 135, "time": "45-60 minutes", "thickness": "1/4 inch"}
    },
    "vegetables": {
        "tomato": {"temp": 135, "time": "30-45 minutes", "thickness": "1/4 inch"},
        "zucchini": {"temp": 135, "time": "20-30 minutes", "thickness": "1/4 inch"},
        "carrot": {"temp": 125, "time": "30-45 minutes", "thickness": "1/8 inch"},
        "bell_pepper": {"temp": 125, "time": "40-50 minutes", "thickness": "1/4 inch"},
        "onion": {"temp": 125, "time": "30-45 minutes", "thickness": "1/4 inch"}
    },
    "meats": {
        "beef_jerky": {"temp": 165, "time": "60-90 minutes", "thickness": "1/8 inch", "note": "Pre-cook meat"},
        "turkey_jerky": {"temp": 165, "time": "60-90 minutes", "thickness": "1/8 inch", "note": "Pre-cook meat"},
        "salmon": {"temp": 145, "time": "45-60 minutes", "thickness": "1/4 inch", "note": "Safe handling required"}
    },
    "nuts": {
        "almonds": {"temp": 155, "time": "60-120 minutes", "thickness": "N/A"},
        "walnuts": {"temp": 155, "time": "60-120 minutes", "thickness": "N/A"},
        "pecans": {"temp": 155, "time": "60-120 minutes", "thickness": "N/A"}
    },
    "herbs": {
        "basil": {"temp": 95, "time": "10-20 minutes", "thickness": "N/A"},
        "parsley": {"temp": 95, "time": "10-20 minutes", "thickness": "N/A"},
        "oregano": {"temp": 95, "time": "10-20 minutes", "thickness": "N/A"}
    },
    "berries": {
        "blueberry": {"temp": 135, "time": "45-60 minutes", "thickness": "1/2 inch"},
        "raspberry": {"temp": 135, "time": "45-60 minutes", "thickness": "1/2 inch"},
        "blackberry": {"temp": 135, "time": "45-60 minutes", "thickness": "1/2 inch"}
    }
};

const FOOD_THEMES = {
    apple: {
        primary: "#d32f2f",
        bgImage: "url('images/fruits_bg.png')",
        bg: "linear-gradient(135deg, #ffdde1 0%, #ee9ca7 100%)",
        running: "linear-gradient(135deg, #e52d27 0%, #b31217 100%)",
        cardBg: "rgba(255, 255, 255, 0.7)",
        textMain: "#3e0000"
    },
    banana: {
        primary: "#d35400",
        bgImage: "url('images/fruits_bg.png')",
        bg: "linear-gradient(135deg, #fff9c4 0%, #f1c40f 100%)",
        running: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        cardBg: "rgba(255, 255, 255, 0.6)",
        textMain: "#423200"
    },
    strawberry: {
        primary: "#c0392b",
        bgImage: "url('images/fruits_bg.png')",
        bg: "linear-gradient(135deg, #fef9d7 0%, #d299c2 100%)",
        running: "linear-gradient(135deg, #ff0844 0%, #ffb199 100%)",
        cardBg: "rgba(255, 255, 255, 0.7)",
        textMain: "#2e000d"
    },
    mango: {
        primary: "#d35400",
        bgImage: "url('images/fruits_bg.png')",
        bg: "linear-gradient(135deg, #f6d365 0%, #fda085 100%)",
        running: "linear-gradient(135deg, #ff0844 0%, #ffb199 100%)",
        cardBg: "rgba(255, 255, 255, 0.65)",
        textMain: "#3b1e00"
    },
    pineapple: {
        primary: "#c27d00",
        bgImage: "url('images/fruits_bg.png')",
        bg: "linear-gradient(120deg, #fdfbfb 0%, #e1e7aa 100%)",
        running: "linear-gradient(to right, #f83600 0%, #f9d423 100%)",
        cardBg: "rgba(255, 255, 255, 0.8)",
        textMain: "#2b1e00"
    },
    tomato: {
        primary: "#c0392b",
        bgImage: "url('images/vegetables_bg.png')",
        bg: "linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)",
        running: "linear-gradient(to right, #ff8177 0%, #ff8c7f 50%, #b12a5b 100%)",
        cardBg: "rgba(255, 255, 255, 0.6)",
        textMain: "#1e293b"
    },
    zucchini: {
        primary: "#27ae60",
        bgImage: "url('images/vegetables_bg.png')",
        bg: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
        running: "linear-gradient(120deg, #13547a 0%, #80d0c7 100%)",
        cardBg: "rgba(255, 255, 255, 0.65)",
        textMain: "#0d3b1e"
    },
    carrot: {
        primary: "#d35400",
        bgImage: "url('images/vegetables_bg.png')",
        bg: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        running: "linear-gradient(to right, #f83600 0%, #f9d423 100%)",
        cardBg: "rgba(255, 255, 255, 0.6)",
        textMain: "#3d1900"
    },
    bell_pepper: {
        primary: "#c0392b",
        bgImage: "url('images/vegetables_bg.png')",
        bg: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        running: "linear-gradient(to right, #ed6ea0 0%, #ec8c69 100%)",
        cardBg: "rgba(255, 255, 255, 0.7)",
        textMain: "#1e293b"
    },
    onion: {
        primary: "#8e44ad",
        bgImage: "url('images/vegetables_bg.png')",
        bg: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
        running: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        cardBg: "rgba(255, 255, 255, 0.65)",
        textMain: "#1e293b"
    },
    beef_jerky: {
        primary: "#cd6133",
        bgImage: "url('images/meats_bg.png')",
        bg: "linear-gradient(135deg, #bdc3c7 0%, #2c3e50 100%)",
        running: "linear-gradient(135deg, #b224ef 0%, #7579ff 100%)",
        cardBg: "rgba(255, 255, 255, 0.8)",
        textMain: "#111",
        textLight: "#444"
    },
    turkey_jerky: {
        primary: "#d35400",
        bgImage: "url('images/meats_bg.png')",
        bg: "linear-gradient(135deg, #e0e0e0 0%, #8f94fb 100%)",
        running: "linear-gradient(to right, #f83600 0%, #f9d423 100%)",
        cardBg: "rgba(255, 255, 255, 0.8)",
        textMain: "#222",
        textLight: "#555"
    },
    salmon: {
        primary: "#e84393",
        bgImage: "url('images/meats_bg.png')",
        bg: "linear-gradient(135deg, #fad0c4 0%, #f1a7f1 100%)",
        running: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        cardBg: "rgba(255, 255, 255, 0.7)",
        textMain: "#2c3e50"
    },
    almonds: {
        primary: "#5d4037",
        bgImage: "url('images/nuts_bg.png')",
        bg: "linear-gradient(135deg, #f5f7fa 0%, #d7ccc8 100%)",
        running: "linear-gradient(135deg, #795548 0%, #5d4037 100%)",
        cardBg: "rgba(255, 255, 255, 0.7)",
        textMain: "#3e2723"
    },
    walnuts: {
        primary: "#5d4037",
        bgImage: "url('images/nuts_bg.png')",
        bg: "linear-gradient(135deg, #f5f7fa 0%, #d7ccc8 100%)",
        running: "linear-gradient(135deg, #795548 0%, #5d4037 100%)",
        cardBg: "rgba(255, 255, 255, 0.7)",
        textMain: "#3e2723"
    },
    pecans: {
        primary: "#5d4037",
        bgImage: "url('images/nuts_bg.png')",
        bg: "linear-gradient(135deg, #f5f7fa 0%, #d7ccc8 100%)",
        running: "linear-gradient(135deg, #795548 0%, #5d4037 100%)",
        cardBg: "rgba(255, 255, 255, 0.7)",
        textMain: "#3e2723"
    },
    basil: {
        primary: "#2E7D32",
        bgImage: "url('images/herbs_bg.png')",
        bg: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        running: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        cardBg: "rgba(255, 255, 255, 0.65)",
        textMain: "#1e293b",
        textLight: "#64748b"
    },
    parsley: {
        primary: "#2E7D32",
        bgImage: "url('images/herbs_bg.png')",
        bg: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        running: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        cardBg: "rgba(255, 255, 255, 0.65)",
        textMain: "#1e293b",
        textLight: "#64748b"
    },
    oregano: {
        primary: "#2E7D32",
        bgImage: "url('images/herbs_bg.png')",
        bg: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        running: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        cardBg: "rgba(255, 255, 255, 0.65)",
        textMain: "#1e293b",
        textLight: "#64748b"
    },
    blueberry: {
        primary: "#2980b9",
        bgImage: "url('images/berries_bg.png')",
        bg: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
        running: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        cardBg: "rgba(255, 255, 255, 0.65)",
        textMain: "#101b3b"
    },
    raspberry: {
        primary: "#e84393",
        bgImage: "url('images/berries_bg.png')",
        bg: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
        running: "linear-gradient(135deg, #ff0844 0%, #ffb199 100%)",
        cardBg: "rgba(255, 255, 255, 0.65)",
        textMain: "#3b001a"
    },
    blackberry: {
        primary: "#2d3436",
        bgImage: "url('images/berries_bg.png')",
        bg: "linear-gradient(135deg, #b2bec3 0%, #636e72 100%)",
        running: "linear-gradient(135deg, #2d3436 0%, #000000 100%)",
        cardBg: "rgba(255, 255, 255, 0.8)",
        textMain: "#111"
    },
    default: {
        primary: "#2E7D32",
        bgImage: "none",
        bg: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        running: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        cardBg: "rgba(255, 255, 255, 0.65)",
        textMain: "#1e293b",
        textLight: "#64748b"
    }
};

let currentState = {
    running: false,
    startTime: null,
    targetSettings: null,
    currentFoodItem: null,
    currentTemp: 70,
    tempHistory: []
};

// Elements
const searchInp = document.getElementById("food-search");
const selectInp = document.getElementById("food-select");
const settingsBox = document.getElementById("settings-display");
const dispTemp = document.getElementById("disp-temp");
const dispTime = document.getElementById("disp-time");
const dispThick = document.getElementById("disp-thickness");
const warnBox = document.getElementById("warning-box");
const btnStart = document.getElementById("btn-start");
const btnStop = document.getElementById("btn-stop");

const statusBadge = document.getElementById("status-badge");
const valElap = document.getElementById("time-elapsed");
const valRem = document.getElementById("time-remaining");
const progPercent = document.getElementById("progress-percent");
const progFill = document.getElementById("progress-bar-fill");

// Init
function init() {
    let optionsHTML = '<option value="">-- Choose from presets --</option>';
    for (const [cat, items] of Object.entries(PRESETS)) {
        for (const food of Object.keys(items)) {
            optionsHTML += `<option value="${food}">${food.charAt(0).toUpperCase() + food.slice(1).replace('_', ' ')}</option>`;
        }
    }
    selectInp.innerHTML = optionsHTML;
    
    // Listeners
    searchInp.addEventListener("input", handleSearch);
    selectInp.addEventListener("change", handleSelect);
    btnStart.addEventListener("click", startDehydrator);
    btnStop.addEventListener("click", stopDehydrator);
    
    // Default theme
    changeTheme('default');
    
    initCharts();
    requestAnimationFrame(updateLoop);
}

function getSettings(query) {
    query = query.toLowerCase().trim();
    for (const [cat, items] of Object.entries(PRESETS)) {
        if (items[query]) return { cat, foodName: query, data: items[query] };
    }
    return null;
}

function handleSearch(e) {
    const val = e.target.value.toLowerCase().trim();
    const match = getSettings(val);
    if(match) {
        selectInp.value = val;
        applySettings(match);
    } else {
        selectInp.value = "";
        settingsBox.classList.add("hidden");
        currentState.targetSettings = null;
        changeTheme('default');
    }
}

function handleSelect(e) {
    const val = e.target.value;
    if(val) {
        searchInp.value = val;
        applySettings(getSettings(val));
    } else {
        settingsBox.classList.add("hidden");
        currentState.targetSettings = null;
        changeTheme('default');
    }
}

function ensureBackgroundDivs() {
    if (!document.getElementById("app-bg")) {
        const bg = document.createElement("div");
        bg.id = "app-bg";
        bg.style.position = "fixed";
        bg.style.top = "0"; bg.style.left = "0"; bg.style.width = "100%"; bg.style.height = "100%";
        bg.style.zIndex = "-2";
        bg.style.backgroundSize = "cover";
        bg.style.backgroundPosition = "center";
        bg.style.transition = "background-image 0.5s ease-in-out";
        document.body.prepend(bg);
    }
    if (!document.getElementById("app-overlay")) {
        const overlay = document.createElement("div");
        overlay.id = "app-overlay";
        overlay.style.position = "fixed";
        overlay.style.top = "0"; overlay.style.left = "0"; overlay.style.width = "100%"; overlay.style.height = "100%";
        overlay.style.zIndex = "-1";
        overlay.style.opacity = "0.75";
        overlay.style.transition = "background 0.5s ease";
        document.body.prepend(overlay);
    }
}

function changeTheme(foodName) {
    ensureBackgroundDivs();
    let theme = FOOD_THEMES[foodName] || FOOD_THEMES.default;
    let root = document.documentElement;
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--running-grad', theme.running);
    root.style.setProperty('--card-bg', theme.cardBg);
    root.style.setProperty('--text-main', theme.textMain);
    root.style.setProperty('--text-light', theme.textLight || 'rgba(0,0,0,0.6)');
    
    // Explicitly apply image to bypass CSS cache entirely!
    let trueImageUrl = theme.bgImage.replace('url(', '').replace(')', '').replace(/'/g, '');
    document.getElementById("app-bg").style.backgroundImage = (trueImageUrl === "none" || trueImageUrl === "") ? "none" : `url('${trueImageUrl}')`;
    document.getElementById("app-overlay").style.background = theme.bg;
    
    // Re-draw charts with new primary color
    if (window.Plotly) {
        updateCharts();
    }
}

function applySettings(match) {
    if(!match) return;
    currentState.targetSettings = { ...match.data, _cat: match.cat };
    currentState.currentFoodItem = match.foodName;
    
    changeTheme(match.foodName);
    
    dispTemp.innerText = match.data.temp;
    dispTime.innerText = match.data.time;
    dispThick.innerText = match.data.thickness;
    settingsBox.classList.remove("hidden");
    
    warnBox.className = "warning-box hidden";
    warnBox.innerText = "";
    if (match.cat === "meats") {
        warnBox.classList.remove("hidden");
        warnBox.innerText = "⚠️ SAFETY WARNING: " + (match.data.note || "Safe handling required");
    } else if (match.data.note) {
        warnBox.classList.remove("hidden");
        warnBox.classList.add("info-box");
        warnBox.innerText = "ℹ️ Note: " + match.data.note;
    }
}

function startDehydrator() {
    if (!currentState.targetSettings) {
        alert("Please select a valid food first!");
        return;
    }
    currentState.running = true;
    currentState.startTime = Date.now();
    currentState.tempHistory = [];
    currentState.currentTemp = 70;
    
    btnStart.classList.add("hidden");
    btnStop.classList.remove("hidden");
    statusBadge.innerText = "RUNNING";
    statusBadge.className = "status-badge running";
    searchInp.disabled = true;
    selectInp.disabled = true;
    
    updateCharts();
}

function stopDehydrator() {
    currentState.running = false;
    btnStart.classList.remove("hidden");
    btnStop.classList.add("hidden");
    statusBadge.innerText = "IDLE";
    statusBadge.className = "status-badge idle";
    searchInp.disabled = false;
    selectInp.disabled = false;
    
    updateCharts();
}

function parseTargetSeconds(timeStr) {
    timeStr = timeStr.toLowerCase();
    let numMatches = timeStr.match(/\d+/g);
    let val = numMatches ? parseInt(numMatches[numMatches.length-1]) : 60;
    if (timeStr.includes("hour")) return val * 3600;
    return val * 60;
}

function formatTime(secs) {
    let h = Math.floor(secs / 3600);
    let m = Math.floor((secs % 3600) / 60);
    let s = Math.floor(secs % 60);
    return `${h.toString().padStart(2,'0')}:${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
}

let lastChartUpdate = 0;
function updateLoop() {
    if (currentState.running) {
        let elapsed = (Date.now() - currentState.startTime) / 1000;
        let total = parseTargetSeconds(currentState.targetSettings.time);
        
        let rem = Math.max(total - elapsed, 0);
        let prog = Math.min((elapsed / total) * 100, 100);
        
        valElap.innerText = formatTime(elapsed);
        valRem.innerText = formatTime(rem);
        progPercent.innerText = prog.toFixed(1) + "%";
        progFill.style.width = prog + "%";
        
        let targetTemp = parseFloat(currentState.targetSettings.temp);
        if (currentState.currentTemp < targetTemp) {
            currentState.currentTemp += 0.3; 
        } else {
            currentState.currentTemp = targetTemp + (Math.random() - 0.5);
        }
        
        if (Date.now() - lastChartUpdate > 1000) {
            currentState.tempHistory.push(currentState.currentTemp);
            updateCharts();
            lastChartUpdate = Date.now();
        }
    }
    requestAnimationFrame(updateLoop);
}

// Charts (Plotly)
function initCharts() {
    let labels = [];
    let vals = [];
    for (const [cat, items] of Object.entries(PRESETS)) {
        labels.push(cat.charAt(0).toUpperCase() + cat.slice(1));
        vals.push(Object.keys(items).length);
    }
    let tracePie = {
        values: vals, labels: labels, type: 'pie', hole: 0.4,
        marker: { colors: ["#2E7D32", "#667eea", "#764ba2", "#ff6b6b", "#ee5a24", "#f1c40f"] },
        textinfo: "label+percent"
    };
    Plotly.newPlot('pie-container', [tracePie], { margin: {t:20, b:20, l:20, r:20}, showlegend: false, paper_bgcolor:'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)' });
    
    updateCharts();
}

function updateCharts() {
    let rootColors = getComputedStyle(document.documentElement);
    let primaryColor = rootColors.getPropertyValue('--primary').trim() || "#2E7D32";
    let runningColor = currentState.running ? primaryColor : primaryColor; // We'll keep primary for the gauge bar

    // Gauge
    let traceG = {
        type: "indicator", mode: "gauge+number",
        value: currentState.currentTemp,
        title: { text: "Temp (°F)", font: {size: 16, color: primaryColor} },
        number: { font: { color: primaryColor } },
        gauge: {
            axis: {range: [null, 200], tickwidth: 1, tickcolor: primaryColor},
            bar: {color: runningColor},
            steps: [
                {range: [0, 100], color: "rgba(255, 255, 255, 0.2)"},
                {range: [100, 160], color: "rgba(0, 0, 0, 0.05)"},
                {range: [160, 200], color: "rgba(255, 107, 107, 0.3)"}
            ],
            threshold: { line: {color: "#ee5a24", width: 5}, thickness: 0.75, value: 165 }
        }
    };
    
    Plotly.react('gauge-container', [traceG], { margin: {t:40, b:20, l:30, r:30}, paper_bgcolor:'rgba(0,0,0,0)' });
    
    // Line Chart
    let baselineTemp = currentState.targetSettings ? currentState.targetSettings.temp : 135;
    if (currentState.tempHistory.length > 0) {
        let x = Array.from({length: currentState.tempHistory.length}, (_, i) => i);
        let traceL = { x: x, y: currentState.tempHistory, type: 'scatter', mode: 'lines', line: {color: primaryColor, width: 3} };
        
        let shapes = [];
        if(currentState.running) {
            shapes.push({ type: 'line', x0: 0, x1: Math.max(x.length, 10), y0: baselineTemp, y1: baselineTemp, line: { color: '#ee5a24', dash: 'dash' } });
        }
        
        Plotly.react('line-container', [traceL], { margin: {t:20, b:30, l:40, r:20}, paper_bgcolor:'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)', shapes: shapes, yaxis: {range: [0, 200], gridcolor: 'rgba(0,0,0,0.1)'}, xaxis: {gridcolor: 'rgba(0,0,0,0.1)'} });
    } else {
        Plotly.react('line-container', [{x:[0], y:[70], type:'scatter', mode:'lines', line: {color:primaryColor}}], { margin: {t:20, b:30, l:40, r:20}, paper_bgcolor:'rgba(0,0,0,0)', plot_bgcolor:'rgba(0,0,0,0)', yaxis: {range: [0,200], gridcolor: 'rgba(0,0,0,0.1)'}, xaxis: {gridcolor: 'rgba(0,0,0,0.1)'} });
    }
}

document.addEventListener("DOMContentLoaded", init);
