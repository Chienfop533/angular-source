#!/bin/bash
DOMAIN="localhost"
PASSWORD="password"
CERTIFICATES_DIR=$PWD
CERTIFICATES="$CERTIFICATES_DIR/$DOMAIN".pfx

if [ ! -f "$CERTIFICATES" ]; then
    # Window GitBash
    if [[ "$OSTYPE" == "msys"* ]]; then
        dotnet dev-certs https -v -ep "$DOMAIN".pfx -p $PASSWORD -t
        openssl pkcs12 -in "$DOMAIN".pfx -nocerts -out "$DOMAIN--encrypted".key -passin pass:$PASSWORD -passout pass:$PASSWORD
        openssl pkcs12 -in "$DOMAIN".pfx -clcerts -nokeys -out "$DOMAIN".crt -passin pass:$PASSWORD
        openssl rsa -in "$DOMAIN--encrypted".key -out "$DOMAIN".key -passin pass:$PASSWORD
    fi    

    # Linux GNU
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then

        openssl genpkey -algorithm RSA -out "$CERTIFICATES_DIR/ca".key
        openssl req -x509 -key "$CERTIFICATES_DIR/ca".key -out "$CERTIFICATES_DIR/ca".crt \
            -subj "/CN=$DOMAIN/O=$DOMAIN"

        openssl genpkey -algorithm RSA -out "$CERTIFICATES_DIR/$DOMAIN".key
        openssl req -new -key "$CERTIFICATES_DIR/$DOMAIN".key -out "$CERTIFICATES_DIR/$DOMAIN".csr \
            -subj "/CN=$DOMAIN/O=$DOMAIN"

        openssl x509 -req -in "$CERTIFICATES_DIR/$DOMAIN".csr -days 365 -out "$CERTIFICATES_DIR/$DOMAIN".crt \
            -CA "$CERTIFICATES_DIR/ca".crt -CAkey "$CERTIFICATES_DIR/ca".key -CAcreateserial \
            -extfile <(cat <<END
basicConstraints = CA:FALSE
subjectKeyIdentifier = hash
authorityKeyIdentifier = keyid,issuer
subjectAltName = DNS:$DOMAIN
END
    )

        openssl pkcs12 -export -out "$CERTIFICATES_DIR/$DOMAIN".pfx -inkey "$CERTIFICATES_DIR/$DOMAIN".key -in "$CERTIFICATES_DIR/$DOMAIN".crt -password pass:$PASSWORD

        # Trust certificates
        OS=$(awk '/DISTRIB_ID=/' /etc/*-release | sed 's/DISTRIB_ID=//' | tr '[:upper:]' '[:lower:]')
        if [[ "$OS" == "garuda" ]]; then
            sudo trust anchor --store "$CERTIFICATES_DIR/ca".crt
            certutil -d "sql:$HOME/.pki/nssdb" -A -i "$CERTIFICATES_DIR/ca".crt -n "localhost CA" -t C,,
        fi

        rm "$CERTIFICATES_DIR/ca".crt
        rm "$CERTIFICATES_DIR/ca".key
        rm "$CERTIFICATES_DIR/ca".srl
        rm "$CERTIFICATES_DIR/$DOMAIN".csr
    fi

    # Mac OSX
    if [[ "$OSTYPE" == "darwin"* ]]; then
        openssl req \
        -x509 \
        -newkey rsa:4096 \
        -sha256 \
        -days 365 \
        -nodes \
        -keyout "$CERTIFICATES_DIR/$DOMAIN".key \
        -out "$CERTIFICATES_DIR/$DOMAIN".crt \
        -subj "/CN=${DOMAIN}" \
        -extensions v3_ca \
        -extensions v3_req \
        -config <( \
        echo '[req]'; \
        echo 'default_bits= 4096'; \
        echo 'distinguished_name=req'; \
        echo 'x509_extension = v3_ca'; \
        echo 'req_extensions = v3_req'; \
        echo '[v3_req]'; \
        echo 'basicConstraints = CA:FALSE'; \
        echo 'keyUsage = nonRepudiation, digitalSignature, keyEncipherment'; \
        echo 'subjectAltName = @alt_names'; \
        echo '[ alt_names ]'; \
        echo "DNS.1 = www.${DOMAIN}"; \
        echo "DNS.2 = ${DOMAIN}"; \
        echo '[ v3_ca ]'; \
        echo 'subjectKeyIdentifier=hash'; \
        echo 'authorityKeyIdentifier=keyid:always,issuer'; \
        echo 'basicConstraints = critical, CA:TRUE, pathlen:0'; \
        echo 'keyUsage = critical, cRLSign, keyCertSign'; \
        echo 'extendedKeyUsage = serverAuth, clientAuth')

        openssl x509 -noout -text -in "$CERTIFICATES_DIR/$DOMAIN".crt

        openssl pkcs12 -export -out "$CERTIFICATES_DIR/$DOMAIN".pfx -inkey "$CERTIFICATES_DIR/$DOMAIN".key -in "$CERTIFICATES_DIR/$DOMAIN".crt -password pass:$PASSWORD

        # Trust certificates
        sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain "$CERTIFICATES_DIR/$DOMAIN".crt
    fi    
fi
