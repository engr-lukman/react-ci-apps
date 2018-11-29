<?php defined('BASEPATH') OR exit('No direct script access allowed');
	
	// Sendmail Config
//	$config['protocol'] = 'sendmail';
//	$config['mailpath'] = '/usr/sbin/sendmail';
//	$config['charset'] = 'iso-8859-1';
//	$config['wordwrap'] = TRUE;
//	$config['mailtype'] = 'html'; // Append This Line

	// Gmail SMTP Config 
	$config['useragent'] = 'CodeIgniter';
	$config['protocol'] = 'smtp';
	$config['smtp_host'] = 'ssl://smtp.googlemail.com';
	$config['smtp_user'] = 'oyosoftltd@gmail.com';
	$config['smtp_pass'] = 'pfN%Nf_5?RmUZ&Cz';
	$config['smtp_port'] = 465; 
	$config['smtp_timeout'] = 5;
	$config['wordwrap'] = TRUE;
	$config['wrapchars'] = 76;
	$config['mailtype'] = 'html';
	$config['charset'] = 'utf-8';
	$config['validate'] = TRUE;
	$config['priority'] = 3;
	$config['crlf'] = "\r\n";
	$config['newline'] = "\r\n";
	$config['bcc_batch_mode'] = FALSE;
	$config['bcc_batch_size'] = 200;
