import re

with open('simulation.html', 'r', encoding='utf-8') as f:
    data = f.read()

target1 = """<p><strong>Procedural Generation:</strong> The Python engine dynamically generates synthetic nodes that mathematically drift according to fluid dynamics models. Each tick of the event loop evaluates the Haversine distance and RSSI dropoff between all virtual nodes. If Node A drifts out of range of Node B, the simulator physically severs the virtual connection, forcing the Mesh Core to dynamically recalculate its Delay Tolerant routing tables. This allows developers to stress-test the FastAPI event loop with 10,000 concurrent Custom Binary TLV packets before touching actual hardware.</p>"""

replacement1 = """<p><strong>Procedural Generation:</strong> The Python engine dynamically seeds the portal with realistic mixed-source data including stationary water-quality stations, shore weather endpoints, moving drifters, ROV-style tracks, and bathymetry survey soundings. It actively simulates mesh network interfaces, neighbor presence, and queued packets. Preset scenarios such as <code>coastal-demo</code> and <code>underwater-ops</code> allow developers to inject JANUS acoustic activity and full fleet topologies to test the FastAPI gateway without requiring physical hardware in the loop.</p>"""

data = data.replace(target1, replacement1)

with open('simulation.html', 'w', encoding='utf-8') as f:
    f.write(data)
print("Updated simulation.html")
