pipeline{
    agent any

    tools {
        nodejs 'node23'
    }    

    stages{
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        stage('Lint') {
            steps {
                echo 'Running ESLint...'
                sh 'npm run lint'
            }
        }
        stage('Test and Deploy Coverage') {
            steps {
                echo 'Running Coverage...'
                sh 'npm run test:coverage'
            }
            steps {
                echo 'Deploying Coverage to GitHub...'
                script {
                    sh 'rm -rf coverage-repo'

                    withCredentials([string(credentialsId: '79f3d47c-31df-4fc7-9f9b-6f5746833f50', variable: 'GITHUB_TOKEN')]) {
                        sh 'git clone https://${GITHUB_TOKEN}@github.com/gustavocamposantunes/coverage-repo.git'
                    }

                    sh 'cp -r coverage/. coverage-repo/'

                    dir('coverage-repo') {
                        sh 'git add .'
                        sh 'git commit -m "chore: update test coverage - $(date +"%d-%m-%Y %H:%M")"'
                        sh 'git push origin master'
                    }
                }
            }
        }
        stage('Build and Deploy Storybook') {
            steps {
                echo 'Building Storybook'
                sh 'npm run build-storybook'
            }
            steps {
                echo 'Deploying Storybook to GitHub...'
                script {
                    sh 'rm -rf storybook-repo'

                    withCredentials([string(credentialsId: '79f3d47c-31df-4fc7-9f9b-6f5746833f50', variable: 'GITHUB_TOKEN')]) {
                        sh 'git clone https://${GITHUB_TOKEN}@github.com/gustavocamposantunes/storybook-repo.git'
                    }

                    sh 'cp -r storybook-static/. storybook-repo/'

                    dir('coverage-repo') {
                        sh 'git add .'
                        sh 'git commit -m "chore: update components storybook - $(date +"%d-%m-%Y %H:%M")"'
                        sh 'git push origin master'
                    }
                }
            }
        }
    }
}