# MapGIS-CloudStorage
中地数码在线云盘


## git 基本操作

1. 远程克隆
    ``` sh
    git clone https://github.com/ParnDeedlit/MapGIS-CloudStorage.git
    ls #克隆的仓库就在该目录下
    ```
1. 查看当期状态
    ``` sh
    git status
    ```
1. 更新代码
    ``` sh
    git add xxx
    git add . #表示添加当前目录的所有文件
    ```

1. 提交代码到本地
    ``` sh
    git commit -m "代码的提交说明" #-m 表示message（消息）
    ```
1. 提交代码到远程
    ``` sh
    git push  #提交到远程
    ```
1. UI查看
    ``` sh
    gitk
  .  ```

1.远程克隆
```sh
  git clone
````

1.出现错误
 ``` sh
*** Please tell me who you are.

Run

  git config --global user.email "you@example.com"
  git config --global user.name "Your Name"

to set your account's default identity.
Omit --global to set the identity only in this repository.

fatal: unable to auto-detect email address (got 'Administrator@WRGHO-612262158.(none)')


解决错误方法：
      git config --global user.email "自己账号的邮箱"
      git config --global user.name "自己账号名"
  ```

1.冲突解决
```sh
    1.本地没有保存的,首先将自己修改的文件git add .  然后提交到本地  git commit -m "xxx"
    2.从远程拉取 git pull
    3.查看状态 git status
    4.解决冲突 编辑器修改
    5. 更新  git add .
    6.提交到本地   git  commit -m "xxx"
    7.提交到远程   git  push
````
