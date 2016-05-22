# OdieBotNet
Check Resolved external IP to the current system IP and email discrepancies.

# Connect to odieabotnet gmail account (Linux)
1. Install needed libraries
	sudo apt-get install postfix mailutils libsasl2-2 ca-certificates libsasl2-modules
2. Add config data to /etc/postfix/main.cf
	sudo vim /etc/postfix/main.cf
	
	relayhost = [smtp.gmail.com]:587
	smtp_sasl_auth_enable = yes
	smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
	smtp_sasl_security_options = noanonymous
	smtp_tls_CAfile = /etc/postfix/cacert.pem
	smtp_use_tls = yes

3. Add username and password to /etc/postfix/sasl_passwd
	sudo vim /etc/postfix/sasl_passwd

	[smtp.gmail.com]:587	odieabotnet@gmail.com:odieabodie

4. Fix permissions and update postfix config to use sasl_passwd
	sudo chmod 400 /etc/postfix/sasl_passwd
	sudo postmap /etc/postfix/sasl_passwd

5. Validate certificates to avoid running into error.
	curl https://www.thawte.com/roots/thawte_Premium_Server_CA.pem 

	cat /etc/ssl/certs/Thawte_Premium_Server_CA.pem | sudo tee -a /etc/postfix/cacert.pem

6. Reload postfix config
	sudo /etc/init.d/postfix reload


# Send test email
	echo `curl www.icanhazip.com` | mail -s "Testy test" gmail@gmail.com

# Pushing to production on abodie local network
	production ssh://<username>@192.168.0.14/home/odieabotnet/IpCheck/repo
