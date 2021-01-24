// stage("Build")

def build_dir = 'dist'; // 需要打包的目录

pipeline {
    agent {
        docker {
            image 'node:14-alpine'
        }
    }
    stages {
        stage('Look node、npm version、npm set 淘宝镜像、npm 下载相关依赖') { 
            steps {
                sh 'node -v'
                sh 'npm -v'
                sh 'npm config set registry https://registry.npm.taobao.org'
            }
        }
        stage('ms-button') { 
            steps {
                sh 'cd ./25-预留作业/ms-button'
                sh 'ls'
                sh 'npm install'
                sh 'ls'
                sh 'npm run build'
                sh 'ls'
                sh 'rm -rf node_modules'
            }
        }
        stage('ms-image') { 
            steps {
                sh 'cd ./25-预留作业/ms-image'
                sh 'npm install'
                sh 'npm run build'
                sh 'rm -rf node_modules'
            }
        }
        stage('ms-main') { 
            steps {
                sh 'cd ./25-预留作业/ms-main'
                sh 'npm install'
                sh 'npm run build'
                sh 'rm -rf node_modules'
            }
        }
        stage('npm run build 并且 使用tar命令压缩打包出来的文件') { 
            steps {
                sh "tar zcvf ${build_dir}.tar.gz ./"
            }
        }
    }
}

// stage("Deployment")

def aly_username = "root" // 阿里云服务器用户名
def aly_server_ip = "123.56.21.102" // 阿里云服务器IP地址
def aly_workspace = "/home/jenkins/frontend" // 阿里云服务器工作目录
def aly_project_name = "webpack5" // 阿里云服务器部署项目名称

stage("部署项目，把打包压缩的文件拷贝到远程服务器")

node {
    sshagent(credentials: ['ssh-aly-deployment']) {
        // 把本地的文件拷贝到远程服务器
        sh "scp -o StrictHostKeyChecking=no -r ./${build_dir}.tar.gz ${aly_username}@${aly_server_ip}:${aly_workspace}/${aly_project_name}"
        // 删除原有的项目静态文件夹
        sh "ssh -o StrictHostKeyChecking=yes ${aly_username}@${aly_server_ip} \" \
            cd ${aly_workspace}/${aly_project_name} \
            && rm -rf ${build_dir} \
            && ls \
            \""
            
        // 解压文件 并且删除压缩包文件
        sh "ssh -o StrictHostKeyChecking=yes ${aly_username}@${aly_server_ip} \" \
            cd ${aly_workspace}/${aly_project_name} \
            &&  tar zxvf ./${build_dir}.tar.gz -C ./ \
            && rm -rf ${build_dir}.tar.gz \
            \""
    }
}