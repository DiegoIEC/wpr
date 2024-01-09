# Build environment
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env
WORKDIR /app
EXPOSE 80
EXPOSE 443

# Enforce root user to ensure tools are installed in the root directory
USER root

# Copy csproj and local tools manifest files
COPY *.csproj ./
COPY .config/ ./.config/

# Restore the project and the local tools
RUN dotnet restore
RUN dotnet tool restore

# Copy everything else and build
COPY . ./
RUN dotnet publish -c Release -o out

# Runtime image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS final-env
WORKDIR /app
COPY --from=build-env /app/out .

# Set the environment variable for HOME
ENV HOME=/root

# Copy the entrypoint script and set permissions
COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]