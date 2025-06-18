FROM golang:1.24-alpine AS build-stage
LABEL authors="jonny"

# Set destination for COPY
WORKDIR /app

# Install CA certificates in the build-stage
RUN apk add --no-cache ca-certificates

# Download Go modules
COPY go.mod go.sum ./
RUN go mod download

# Copy the source code. Note the slash at the end, as explained in
# https://docs.docker.com/reference/dockerfile/#copy
COPY . ./

# Build
RUN CGO_ENABLED=0 GOOS=linux go build -trimpath -ldflags="-w -s" -o /listener ./cmd/listener

# Run the tests in the container
FROM build-stage AS run-test-stage
RUN go test -v ./...

# Deploy the application binary into a lean image
FROM scratch AS build-release-stage

COPY --from=build-stage /listener /listener

# Copy CA certificates
COPY --from=build-stage /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/

# Optional:
# To bind to a TCP port, runtime parameters must be supplied to the docker command.
# But we can document in the Dockerfile what ports
# the application is going to listen on by default.
# https://docs.docker.com/reference/dockerfile/#expose
EXPOSE 2525

USER 1000:1000

# Run
CMD ["/listener"]