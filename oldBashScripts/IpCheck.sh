#!/bin/bash

# Check to make sure something was passed in for the config directory
if [ "$#" -ne 1 ]; then
	echo "[ERROR] the config directory must be given"
	exit
fi

configDirectoryPath=$1 # config directory must be passed in
emailPath="$configDirectoryPath/emails.conf"
lastIpPath="$configDirectoryPath/lastExternalIp.conf"
templatePath="$configDirectoryPath/template.html"

externalIp=$(curl -s 'www.icanhazip.com') 
resolvedIp=$(host odieabodie.ddns.net | sed 's%.* %%')
lastIp=$(tail -n 1 $lastIpPath )
readarray -t emailWhiteList < "$emailPath"

templateString=$(tail $templatePath)

if [[ ${externalIp} != ${resolvedIp} ]] 
then 
	echo [INFO] Resolve IP != External IP
	echo [RESULT] $resolvedIp != $externalIp
	
	# check if IP has changed from previous external IP
	if [[ ${externalIp} != ${lastIp} ]]
	then
		echo [INFO] Emailing everyone!
		echo ${externalIp} > $lastIpPath

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
