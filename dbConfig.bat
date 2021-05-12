@echo off
set basedir=%cd%
set dbuser=root
set dbpwd=123qwe
set dbname=httpTest
echo %basedir%
xcopy %basedir%\config\mysql.conf.template %basedir%\config\mysql.conf
mysql -uroot -p%dbpwd% -e "CREATE DATABASE %dbname%"
mysql -uroot -p%dbpwd% %dbname% < %basedir%\httpTest.sql  

