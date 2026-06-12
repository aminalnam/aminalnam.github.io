import re

with open('hardware.html', 'r', encoding='utf-8') as f:
    data = f.read()

# Truncate at the first </html>
data = data.split('</html>')[0] + '</html>\n'

data = data.replace('<code>operator_label</code>, <code>mesh-id</code>, and physical MAC address directly on the screen.</li>', '<code>operator_label</code> (e.g. <code>TBSP-S-01</code>), alongside the chip factory eFuse <code>physical_mac</code> directly on the boot screen.</li>')

data = data.replace('battery voltage, charging status, and thermal metrics.', 'battery voltage, charge percentage, and thermal metrics.')

code_old = """void update_oled_display() {
    display.clear();
    // 1. Render Identity
    display.drawString(0, 0, "OP: " + String(operator_label));
    display.drawString(0, 10, "ID: " + String(mesh_id));
    
    // 2. Render Hardware Health
    float batt_v = pmu.getBatteryVoltage();
    float core_temp = temperatureRead();
    display.drawString(0, 20, "BAT: " + String(batt_v) + "V  TMP: " + String(core_temp) + "C");
    
    // 3. Render Position
    display.drawString(0, 30, "GPS: " + String(gps.location.lat(), 4) + ", " + String(gps.location.lng(), 4));
    
    display.display();
}"""

code_new = """void update_oled_display() {
    display.clear();
    // 1. Render Identity
    display.drawString(0, 8, "OA " + String(operator_label) + "   " + String(uptime));
    
    // 2. Render Hardware Health
    float esp_temp = temperatureRead();
    if (pmu.isReady()) {
        float batt_pct = pmu.getBatteryPercent();
        display.drawString(0, 19, "T:" + String(esp_temp) + "C  bat:" + String(batt_pct) + "%");
    }
    
    // 3. Render Position
    display.drawString(0, 41, String(gps.location.lat(), 4) + "," + String(gps.location.lng(), 4));
    
    display.display();
}"""

data = data.replace(code_old, code_new)

with open('hardware.html', 'w', encoding='utf-8') as f:
    f.write(data)
print("Updated hardware.html successfully")
