# ProfessEffect

## 개발환경 생성(팀장, git-scm, node 설치 기준)

### 1.git 글로벌 변수 설정

git config --global user.name 이름

ex)
git config --global user.name hamletshu

git config --global user.email 이메일

### 2.로컬에 있는 저장소로 깃허브 연동하기(로컬에 있는 프로젝트를 repository로 강제로 올리고 싶을 때)

빈 프로젝트부터 새로 만들 것이라면 git clone을 통해서 진행하면 된다.

git remote add origin https://github.com/ahngo13/ProfessEffect (repository는 github 사이트에서 미리 추가)

git pull origin master --allow-unrelated-histories (강제 pull)

## 개발환경 세팅(팀원, git-scm, node 설치 기준)

### 1.git 글로벌 변수 설정

git config --global user.name 이름

ex)
git config --global user.name hamletshu

git config --global user.email 이메일

ex)
git config --global user.email ahngo13@naver.com

### 2.이미 존재하는 Github의 레포지토리와 연동(글로벌 변수 설정 이후 바로 진행)

git clone https://github.com/ahngo13/ProfessEffect
