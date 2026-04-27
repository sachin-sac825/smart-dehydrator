import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import time
import re

# 5. TECH STACK: Streamlit + Plotly Express + Pandas + NumPy
# Single-file app, Responsive mobile-first design
st.set_page_config(page_title="Smart Food Dehydrator Dashboard", layout="wide", page_icon="🍎")

# 6. EXACT COPY THE CSS & 🎨 COLORS & THEME
st.markdown("""
<style>
.main-header { 
    font-size: 3rem; 
    color: #2E7D32; 
    text-align: center; 
    font-weight: bold; 
    margin-bottom: 2rem;
    text-shadow: 1px 1px 4px rgba(0,0,0,0.1);
}
.metric-card { 
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
    padding: 30px; 
    border-radius: 15px; 
    color: white; 
    text-align: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transition: transform 0.3s ease;
}
.metric-card:hover { transform: scale(1.02); }

.warning-card { 
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); 
    padding: 30px; 
    border-radius: 15px; 
    color: white; 
    text-align: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    transition: transform 0.3s ease;
}
.warning-card:hover { transform: scale(1.02); }

/* Center Streamlit titles visually */
h1, h2, h3 { color: #2E7D32; }

/* Custom padding for layout columns */
[data-testid="column"] {
    padding: 1rem;
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
</style>
""", unsafe_allow_html=True)

# Main Header
st.markdown('<div class="main-header">Smart Food Dehydrator Dashboard</div>', unsafe_allow_html=True)

# 1. FULL DATASET (Household Fast-Dehydrate Optimized)
FOOD_DEHYDRATOR_PRESETS = {
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
}

# 4. SESSION STATE TRACKING
if 'dehydrator_running' not in st.session_state:
    st.session_state.dehydrator_running = False
if 'start_time' not in st.session_state:
    st.session_state.start_time = None
if 'current_food' not in st.session_state:
    st.session_state.current_food = ""
if 'target_settings' not in st.session_state:
    st.session_state.target_settings = {}
if 'temp_history' not in st.session_state:
    st.session_state.temp_history = pd.DataFrame(columns=['Time', 'Temperature'])

def get_food_settings(food_query):
    food_query = food_query.lower().strip()
    for category, items in FOOD_DEHYDRATOR_PRESETS.items():
        if food_query in items:
            return items[food_query], category
    return None, None

# 2. DASHBOARD LAYOUT (3-COLUMN WIDE LAYOUT)
col_left, col_center, col_right = st.columns([1, 2, 1], gap="medium")

with col_left:
    st.markdown("### 📝 Food Input")
    
    # 3. Text input detects food -> auto-fills
    user_input = st.text_input("Type food (e.g. apple, beef_jerky)", placeholder="Search datasets...")
    
    selected_settings = None
    selected_cat = None
    if user_input:
        selected_settings, selected_cat = get_food_settings(user_input)
    
    # Fallback to dropdown
    all_foods = [food for cat in FOOD_DEHYDRATOR_PRESETS.values() for food in cat.keys()]
    idx = all_foods.index(user_input.lower()) + 1 if (user_input and selected_settings) else 0
    selected_dropdown = st.selectbox("Or choose from presets:", [""] + all_foods, index=idx)
    
    if selected_dropdown and not selected_settings:
         selected_settings, selected_cat = get_food_settings(selected_dropdown)
         user_input = selected_dropdown

    # Auto-fill settings details
    if selected_settings:
        st.session_state.current_food = user_input.lower()
        st.session_state.target_settings = selected_settings
        st.success(f"✅ Loaded: **{user_input.capitalize()}**")
        
        st.markdown(f"**🌡️ Temp:** {selected_settings['temp']}°F")
        st.markdown(f"**⏱️ Time:** {selected_settings['time']}")
        st.markdown(f"**📏 Thickness:** {selected_settings['thickness']}")
        
        # 3. Safety warnings for meats
        if selected_cat == "meats":
            st.error("⚠️ **SAFETY WARNING:** " + str(selected_settings.get('note', 'Safe handling required')))
        elif "note" in selected_settings:
            st.info("ℹ️ **Note:** " + str(selected_settings['note']))
    elif user_input:
        st.warning("Food not found in presets! Select from dropdown.")

    st.markdown("<hr>", unsafe_allow_html=True)

    # 3. START/STOP buttons
    if not st.session_state.dehydrator_running:
        if st.button("▶️ START DEHYDRATOR", use_container_width=True, type="primary"):
            if not st.session_state.target_settings:
                st.error("Select a valid food first!")
            else:
                st.session_state.dehydrator_running = True
                st.session_state.start_time = datetime.now()
                st.session_state.temp_history = pd.DataFrame(columns=['Time', 'Temperature'])
                st.rerun()
    else:
        if st.button("⏹️ STOP DEHYDRATOR", use_container_width=True):
            st.session_state.dehydrator_running = False
            st.session_state.start_time = None
            st.rerun()

elapsed_seconds = 0
progress_val = 0.0
time_rem_str = "00:00:00"
elapsed_str = "00:00:00"

if st.session_state.dehydrator_running and st.session_state.start_time:
    delta = datetime.now() - st.session_state.start_time
    elapsed_seconds = delta.total_seconds()
    
    hours, remainder = divmod(elapsed_seconds, 3600)
    minutes, seconds = divmod(remainder, 60)
    elapsed_str = f"{int(hours):02d}:{int(minutes):02d}:{int(seconds):02d}"
    
    time_str = st.session_state.target_settings.get("time", "60 minutes").lower()
    nums = re.findall(r'\d+', time_str)
    unit_val = int(nums[-1]) if nums else 60
    
    if "minute" in time_str:
        total_seconds = unit_val * 60
    elif "hour" in time_str:
        total_seconds = unit_val * 3600
    else:
        total_seconds = unit_val * 60 # fallback to minutes
        
    progress_val = min(elapsed_seconds / total_seconds, 1.0)
    rem_seconds = max(total_seconds - elapsed_seconds, 0)
    
    r_hours, r_remainder = divmod(rem_seconds, 3600)
    r_minutes, r_seconds = divmod(r_remainder, 60)
    time_rem_str = f"{int(r_hours):02d}:{int(r_minutes):02d}:{int(r_seconds):02d}"

with col_right:
    st.markdown("### ⏱️ Tracker")
    card_class = "metric-card" if st.session_state.dehydrator_running else "warning-card"
    status_text = "RUNNING" if st.session_state.dehydrator_running else "IDLE"
    
    st.markdown(f"""
    <div class="{card_class}">
        <h2 style='margin:0; font-size:2rem;'>{status_text}</h2>
    </div>
    <br>
    """, unsafe_allow_html=True)
    
    st.metric(label="Time Elapsed", value=elapsed_str)
    st.metric(label="Time Remaining", value=time_rem_str)
    
    st.markdown(f"**Progress: {progress_val * 100:.1f}%**")
    st.progress(progress_val)

with col_center:
    st.markdown("### 🌡️ Device Status")
    
    current_temp = 70.0 # Contextual Ambient Room Temp
    target_temp = 135.0
    if st.session_state.target_settings:
        target_temp = float(st.session_state.target_settings.get('temp', 135.0))
        
    if st.session_state.dehydrator_running:
        # Simulate heating up
        current_temp = min(target_temp, 70.0 + elapsed_seconds * 2.5)
        if current_temp >= target_temp:
            # Maintain temp with natural noise
            current_temp = target_temp + np.random.uniform(-0.8, 0.8)

    # 3. Temperature GAUGE (0-200°F, color-coded zones, 165°F red zone)
    fig_gauge = go.Figure(go.Indicator(
        mode="gauge+number",
        value=current_temp,
        domain={'x': [0, 1], 'y': [0, 1]},
        title={'text': "Internal Temperature (°F)", 'font': {'size': 20, 'color': '#2E7D32'}},
        gauge={
            'axis': {'range': [None, 200], 'tickwidth': 1, 'tickcolor': "darkblue"},
            'bar': {'color': "#2E7D32" if not st.session_state.dehydrator_running else "#667eea"},
            'bgcolor': "white",
            'borderwidth': 2,
            'bordercolor': "gray",
            'steps': [
                {'range': [0, 100], 'color': "rgba(102, 126, 234, 0.15)"},    
                {'range': [100, 160], 'color': "rgba(118, 75, 162, 0.15)"},   
                {'range': [160, 200], 'color': "rgba(255, 107, 107, 0.25)"}   
            ],
            'threshold': {
                'line': {'color': "#ee5a24", 'width': 7},
                'thickness': 0.85,
                'value': 165 
            }
        }
    ))
    fig_gauge.add_annotation(
        x=0.8, y=0.85,
        text="⚠️ 165°F Red Zone",
        showarrow=False,
        font={"size": 13, "color": "#ee5a24", "weight": "bold"}
    )
    fig_gauge.update_layout(height=320, margin=dict(l=20, r=20, t=50, b=20), paper_bgcolor="rgba(0,0,0,0)")
    st.plotly_chart(fig_gauge, use_container_width=True)

st.markdown("---")

# 3. 2 Charts: Temperature history (line) + Food categories (pie)
col_chart_left, col_chart_right = st.columns(2, gap="medium")

with col_chart_left:
    st.markdown("#### 📈 24hr Temp History")
    if st.session_state.dehydrator_running:
        new_row = pd.DataFrame({'Time': [datetime.now()], 'Temperature': [current_temp]})
        st.session_state.temp_history = pd.concat([st.session_state.temp_history, new_row], ignore_index=True)
        # Limit history size
        if len(st.session_state.temp_history) > 1000:
            st.session_state.temp_history = st.session_state.temp_history.iloc[-1000:]
            
    if not st.session_state.temp_history.empty:
        fig_line = px.line(st.session_state.temp_history, x='Time', y='Temperature',
                           color_discrete_sequence=['#2E7D32'])
        fig_line.add_hline(y=target_temp, line_dash="dash", line_color="#ee5a24", annotation_text=f"Target: {target_temp}°F")
        fig_line.update_layout(height=300, margin=dict(l=0, r=0, t=20, b=0), xaxis_title="", yaxis_title="Temp (°F)")
        st.plotly_chart(fig_line, use_container_width=True)
    else:
        # Dummy data for visually appealing idle state
        dummy_df = pd.DataFrame({'Time': [datetime.now()], 'Temperature': [70]})
        fig_dummy = px.line(dummy_df, x='Time', y='Temperature', color_discrete_sequence=['#2E7D32'])
        fig_dummy.update_layout(height=300, yaxis_range=[0, 200], margin=dict(l=0, r=0, t=20, b=0))
        st.plotly_chart(fig_dummy, use_container_width=True)

with col_chart_right:
    st.markdown("#### 🍎 Presets Categories")
    category_counts = []
    for cat, items in FOOD_DEHYDRATOR_PRESETS.items():
        category_counts.append({'Category': cat.capitalize(), 'Count': len(items)})
    df_pie = pd.DataFrame(category_counts)
    
    fig_pie = px.pie(df_pie, values='Count', names='Category', hole=0.4,
                     color_discrete_sequence=["#2E7D32", "#667eea", "#764ba2", "#ff6b6b", "#ee5a24", "#f1c40f"])
    fig_pie.update_traces(textposition='inside', textinfo='percent+label', marker={"line": {"color": '#ffffff', "width": 2}})
    fig_pie.update_layout(height=300, margin=dict(l=0, r=0, t=20, b=0), showlegend=False)
    st.plotly_chart(fig_pie, use_container_width=True)


# 7. FOOTER SAFETY GUIDELINES
st.markdown("---")
st.markdown("""
<div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 5px solid #2E7D32;">
    <h4 style="margin-top: 0; color: #2E7D32;">🛡️ Safety Guidelines</h4>
    <ul style="margin-bottom: 0; color: #555;">
        <li>Always follow food safety guidelines</li>
        <li>Pre-cook meats to safe internal temperature</li>
        <li>Clean trays before and after use</li>
        <li>Monitor first batches for perfect results</li>
    </ul>
</div>
""", unsafe_allow_html=True)

# 3. Real-time updates handler `st.rerun()`
if st.session_state.dehydrator_running:
    time.sleep(1) # Rerun throttle
    st.rerun()
