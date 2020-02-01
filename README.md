# Profess Effect

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

## 개발시 공유사항

MySql 컬럼 작명 시 스네이크 표기법 기준

Table 생성 시 insert_date, update_date 기본 컬럼 추가

html, css, js 등 일반 변수의 경우 카멜 표기법 기준




## 테이블 구성

### 회원

~~~sql
CREATE TABLE `user` (
  `user_email` varchar(320) NOT NULL,
  `password` text NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `nick_name` varchar(45) NOT NULL,
  `insert_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `use_yn` varchar(2) NOT NULL, DEFAULT '1',
  PRIMARY KEY (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='회원'
~~~



### 떠벌림M

~~~sql
CREATE TABLE `professeffect`.`professm` (
  `profess_no` INT NOT NULL AUTO_INCREMENT,
  `profess_title` TEXT NOT NULL,
  `profess_content` TEXT NOT NULL,
  `nick_name` VARCHAR(45) NOT NULL,
  `user_email` VARCHAR(320) NOT NULL,
  `status` VARCHAR(2) NOT NULL DEFAULT 0,
  `img_path` TEXT NULL,
  `category_code` VARCHAR(45) NOT NULL,
  `good_cnt` INT NOT NULL DEFAULT 0,
  `insert_date` DATETIME NOT NULL DEFAULT now(),
  `update_date` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`profess_no`))
~~~



### 떠벌림DT

~~~sql
CREATE TABLE `professeffect`.`professdt` (
  `profess_no` INT NOT NULL AUTO_INCREMENT,
  `profess_title` TEXT NOT NULL,
  `profess_content` TEXT NOT NULL,
  `nick_name` VARCHAR(45) NOT NULL,
  `good_cnt` INT NOT NULL DEFAULT 0,
  `img_path` TEXT NULL,
  `insert_date` DATETIME NOT NULL DEFAULT now(),
  `update_date` DATETIME NOT NULL DEFAULT now(),
  PRIMARY KEY (`profess_no`))
~~~

