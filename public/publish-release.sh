project_path=$(cd `dirname $0`; pwd)
scp -r $project_path/../dist/* root@116.62.201.141:/home/labuan/crm/assets