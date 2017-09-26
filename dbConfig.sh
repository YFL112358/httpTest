basedir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
dbuser=root
dbpwd=123456
dbname=httpTest

cp $basedir/config/mysql.conf.template $basedir/config/mysql.conf

mysql -uroot -p$dbpwd -e CREATE DATABASE $dbname

mysql -uroot -p$dbpwd $dbname < $basedir/httpTest.sql  


