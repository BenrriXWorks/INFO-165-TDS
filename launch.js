const { execSync } = require('child_process');

try {
    console.log('Ejecutando servidor en plotter...');
    execSync('cd plotter && node ./server.js', { stdio: 'inherit' });

    console.log('Ejecutando cliente en interpreter...');
    execSync('cd interpreter && node ./client.js', { stdio: 'inherit' });
} catch (error) {
    console.error(`Error ejecutando comandos: ${error.message}`);
}
