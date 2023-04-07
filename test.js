const { spawn } = require('child_process');

// Spawn a Python process
const pythonProcess = spawn('python', ['/home/defygui/defy_serial_echo_off.py']);

// Listen for data from Python process
pythonProcess.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

// Listen for errors from Python process
pythonProcess.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

// Listen for the Python process to exit
pythonProcess.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});
