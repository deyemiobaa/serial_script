const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

// Define the serial port and baud rate
const port = new SerialPort('/dev/ttyAMA0', {
  baudRate: 115200
});

// Check if the serial port is open
if (port.isOpen) {
  console.log('Serial port is open');
} else {
  console.log('Failed to open serial port, exiting');
  process.exit(1);
}

// Continuously read NMEA data from the serial port
const parser = new Readline();
port.pipe(parser);

parser.on('data', (data) => {
  if (data.startsWith('$')) { // Check if the data is a valid NMEA sentence
    console.log('NMEA Sentence:', data);
  }
});

// Handle errors
port.on('error', (err) => {
  console.log('Error:', err.message);
});

// Close the serial port on exit
process.on('SIGINT', () => {
  port.close((err) => {
    if (err) {
      console.log('Error closing serial port:', err.message);
    }
    process.exit();
  });
});
