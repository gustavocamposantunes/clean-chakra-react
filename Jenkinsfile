pipeline{
    agent any

    tools {
        nodejs 'node23'
    }

    

    stages{
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install' // Instala todas as dependências do projeto
            }
        }
        stage('Lint') {
            steps {
                echo 'Running ESLint...'
                sh 'npm run lint'
            }
        }
    }
}