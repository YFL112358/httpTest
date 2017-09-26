basedir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
dbuser=root
dbpwd=
dbname=httpTest

cp $basedir/config/mysql.conf.template $basedir/config/mysql.conf


if [ ! -z $dbpwd ]; then
  mysql -uroot -p"\'$dbpwd\'" -e "CREATE DATABASE $dbname"
else
  mysql -uroot -e "CREATE DATABASE $dbname"
fi

if [ ! -z $dbpwd ]; then
  mysql -uroot -p"\'$dbpwd\'" $dbname < $basedir/httpTest.sql  
else
  mysql -uroot $dbname < $basedir/httpTest.sql  
fi

