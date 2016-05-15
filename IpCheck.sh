#!/bin/bash

externalIp=$(curl -s 'www.icanhazip.com') 
resolvedIp=$(host odieabodie.ddns.net | sed 's%.* %%')
lastIp=$(tail -n 1 config/lastExternalIp.conf)
readarray -t emailWhiteList < config/emails.conf

templateString=$(tail config/template.html)

if [[ ${externalIp} != ${resolvedIp} ]] 
then 
	echo [INFO] Resolve IP != External IP
	echo [RESULT] $resolvedIp != $externalIp
	
	# check if IP has changed from previous external IP
	if [[ ${externalIp} != ${lastIp} ]]
	then
		echo [INFO] Emailing everyone!
		echo ${externalIp} > config/lastExternIp.conf

		# send emails
		for email in "${emailWhiteList[@]}"
		do
			echo [INFO] Sending email to $email
			htmlBody=`echo $templateString | sed "s%{ip_address}%$externalIp%g"`
			htmlSubject="New Adobie IP address: ${externalIp}\nContent-Type: text/html"

			echo $htmlBody | mail -s "$( echo -e $htmlSubject )" $email
		done

	else
		echo [RESULT] Already Sent emails
	fi
else 
	echo [RESULT] Good IP
fi
