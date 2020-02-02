# Profess Effect

## 개발환경 생성(팀장, git-scm, node 설치 기준)

### 1.git 글로벌 변수 설정

git init

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
  `use_yn` varchar(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='회원'
~~~



### 떠벌림M

~~~sql
CREATE TABLE `professm` (
  `profess_no` int(11) NOT NULL AUTO_INCREMENT,
  `profess_title` text NOT NULL,
  `profess_content` text NOT NULL,
  `nick_name` varchar(45) NOT NULL,
  `user_email` varchar(320) NOT NULL,
  `status` varchar(2) NOT NULL DEFAULT '0',
  `img_path` text,
  `category_code` varchar(45) NOT NULL,
  `good_cnt` int(11) NOT NULL DEFAULT '0',
  `insert_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`profess_no`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4
~~~



### 떠벌림DT

~~~sql
CREATE TABLE `professdt` (
  `profess_no` int(11) NOT NULL,
  `professdt_no` int(11) NOT NULL,
  `user_email` varchar(320) NOT NULL,
  `profess_title` text NOT NULL,
  `profess_content` text NOT NULL,
  `nick_name` varchar(45) NOT NULL,
  `good_cnt` int(11) NOT NULL DEFAULT '0',
  `img_path` text,
  `insert_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`profess_no`,`professdt_no`,`user_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
~~~

### 떠벌림 카테고리

~~~sql
CREATE TABLE `category` (
  `category_id` int(3) NOT NULL,
  `category_name` text NOT NULL,
  `use_yn` varchar(2) NOT NULL DEFAULT '1',
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
~~~

### 떠벌림M INSERT 트리거

~~~sql
CREATE TRIGGER `professeffect`.`professm_AFTER_INSERT` AFTER INSERT ON `professm` FOR EACH ROW
BEGIN
	INSERT INTO PROFESSDT(PROFESS_NO, PROFESSDT_NO, USER_EMAIL, PROFESS_TITLE, PROFESS_CONTENT, NICK_NAME, IMG_PATH)
	VALUES (NEW.PROFESS_NO,1,NEW.USER_EMAIL,NEW.PROFESS_TITLE,NEW.PROFESS_CONTENT,NEW.NICK_NAME,NEW.IMG_PATH);
END
~~~
