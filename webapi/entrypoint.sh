#!/bin/bash
set -e

# Find the dotnet-ef tool
echo "Searching for dotnet-ef..."
FOUND_DOTNET_EF=$(find / -name dotnet-ef 2>/dev/null)

if [ -z "$FOUND_DOTNET_EF" ]; then
    echo "dotnet-ef not found."
else
    echo "dotnet-ef found at $FOUND_DOTNET_EF"
    # Run the EF Core migrations using the found path
    $FOUND_DOTNET_EF database update
fi

# Start the main application
dotnet webapi.dll