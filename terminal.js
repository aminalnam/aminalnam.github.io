const output = document.getElementById('output');
const cmdline = document.getElementById('cmdline');
const cursor = document.getElementById('cursor');

// Virtual File System
const fileSystem = {
  'manifesto.txt': 'OMEGA exists to obliterate the economic barrier to marine research. Resilience over Perfection. Open-source or nothing.',
  'telemetry.json': '{\n  "buoy-alpha": {"lat": 37.77, "lon": -122.41, "temp": 14.2},\n  "buoy-beta": {"lat": 37.60, "lon": -122.65, "temp": 13.8}\n}',
  'secrets.key': 'ACCESS DENIED: Insufficient RBAC clearance. This incident will be logged.',
  'boot.log': '00:00:01 SYS Booting Linux 5.15.0...\n00:00:02 SYS Initializing SX1262 LoRa module... OK\n00:00:03 SYS Establishing Mesh DTN... OK\n00:00:04 SYS OMEGA Gateway Online.'
};

// Initial Boot Sequence
const bootSequence = [
  "OMEGA OS v4.2.1-stable (x86_64)",
  "Copyright (c) 2026 Jonathan Capone",
  "Initializing cryptographic subsystems... DONE",
  "Establishing secure satellite uplink... DONE",
  "Loading virtual file system...",
  "Type 'help' to see a list of available commands.",
  ""
];

let bootIndex = 0;
function printBoot() {
  if (bootIndex < bootSequence.length) {
    printOutput(bootSequence[bootIndex]);
    bootIndex++;
    setTimeout(printBoot, 100);
  }
}

// Print line to terminal
function printOutput(text, isHtml = false) {
  const line = document.createElement('div');
  line.className = 'output-line';
  if (isHtml) {
    line.innerHTML = text;
  } else {
    line.textContent = text;
  }
  output.appendChild(line);
  scrollToBottom();
}

// Keep input in focus
document.addEventListener('click', () => cmdline.focus());

// Custom cursor tracking
cmdline.addEventListener('input', updateCursor);
cmdline.addEventListener('keydown', updateCursor);
cmdline.addEventListener('keyup', updateCursor);

function updateCursor() {
  // Approximate cursor position based on input length
  const charWidth = 10; // Approx width of VT323 char at 1.2rem
  const pos = cmdline.selectionStart * charWidth;
  cursor.style.left = `${pos}px`;
}

// Command execution
cmdline.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const cmdStr = this.value.trim();
    printOutput(`root@omega-gateway:~# ${cmdStr}`);
    
    if (cmdStr) {
      executeCommand(cmdStr);
    }
    
    this.value = '';
    updateCursor();
  }
});

function scrollToBottom() {
  const container = document.getElementById('terminal-container');
  container.scrollTop = container.scrollHeight;
}

// Command Parser
function executeCommand(cmdStr) {
  const args = cmdStr.split(' ');
  const cmd = args[0].toLowerCase();

  switch(cmd) {
    case 'help':
      printOutput('Available commands:\n  help    - Show this message\n  ls      - List directory contents\n  cat     - Print file contents\n  clear   - Clear terminal screen\n  ping    - Ping a remote node\n  whoami  - Print current user\n  exit    - Terminate secure session');
      break;
    case 'ls':
      const files = Object.keys(fileSystem).join('  ');
      printOutput(files);
      break;
    case 'cat':
      if (args.length < 2) {
        printOutput('cat: missing operand');
      } else {
        const file = args[1];
        if (fileSystem[file]) {
          printOutput(fileSystem[file]);
        } else {
          printOutput(`cat: ${file}: No such file or directory`);
        }
      }
      break;
    case 'clear':
      output.innerHTML = '';
      break;
    case 'whoami':
      printOutput('root\n(Warning: Remote SSH session detected from unauthorized IP. Auto-destruct sequence paused.)');
      break;
    case 'ping':
      if (args.length < 2) {
        printOutput('Usage: ping <target_node>');
      } else {
        const target = args[1];
        printOutput(`PING ${target} via LoRa 915MHz: 56 data bytes`);
        setTimeout(() => printOutput(`64 bytes from ${target}: icmp_seq=1 time=245 ms`), 500);
        setTimeout(() => printOutput(`64 bytes from ${target}: icmp_seq=2 time=230 ms`), 1500);
        setTimeout(() => printOutput(`64 bytes from ${target}: icmp_seq=3 time=235 ms`), 2500);
        setTimeout(() => printOutput(`\n--- ${target} ping statistics ---\n3 packets transmitted, 3 received, 0% packet loss, time 3000ms`), 3500);
      }
      break;
    case 'exit':
      printOutput('Terminating secure session...');
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1000);
      break;
    case 'sudo':
      printOutput('This incident has been reported.');
      break;
    default:
      printOutput(`bash: ${cmd}: command not found`);
  }
}

// Start
printBoot();
