#!/bin/bash
echo "=========================================="
echo "   Pauza Level Up - Pornire aplicatie"
echo "=========================================="
echo ""

cd "$(dirname "$0")"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Instalare dependinte... (doar prima data)"
    npm install
    echo ""
fi

# Check if dist exists
if [ ! -d "dist" ]; then
    echo "Construire aplicatie..."
    npm run build
    echo ""
fi

echo "Pornire server pe http://localhost:3000"
echo ""
echo " >> Deschide Chrome si acceseaza: http://localhost:3000"
echo " >> Pentru a opri: Ctrl+C"
echo ""

# Open browser
if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:3000 &
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open http://localhost:3000 &
fi

# Start the preview server
npx vite preview --port=3000 --host=0.0.0.0
