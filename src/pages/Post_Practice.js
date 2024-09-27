import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Post_Practice = () => {
    const nickname = useSelector(state => state.memberSlice.nickname);
    const isLogin = useSelector(state => state.memberSlice.isLogin);

    const navi = useNavigate();

    const dispatch = useDispatch();

    const uploadFiles = [];

    const openFileInput = useCallback(() => {
        document.querySelector("#uploadFiles").click();
    }, []);

    // 미리보기 처리
    const imageLoader = (file) => {
        let reader = new FileReader();

        reader.onload = (e) => {
            let img = document.createElement('img');
            
            img.setAttribute('width', '150px');
            img.setAttribute('height', '80px');
            img.setAttribute('style', 'z-index: none;');

            if(file.name.toLowerCase().match(/(.*?)\.(jpg|png|jpeg|gif|svg|bmp)$/)) {
                img.src = e.target.result;
            } else {
                img.src = '/images/defaultFileImg.png';
            }

            document.querySelector('#preview').appendChild(makeDiv(img, file));
        }

        reader.readAsDataURL(file);
    }

    const makeDiv = (img, file) => {
        let div = document.createElement('div');

        div.setAttribute('style', 'display: inline-block; position: relative;' +
            ' width: 150px; height: 120px; margin: 5px; border: 1px solid #00f; z-index: 1;'
        );

        let btn = document.createElement('input');
        btn.setAttribute('type', 'button');
        btn.setAttribute('value', 'x');
        btn.setAttribute('deleteFile', file.name);
        btn.setAttribute('style', 'width: 30px; height: 30px; position: absolute;' + 
            ' right: 0; bottom: 0; z-index: 999; background-color: rgba(255, 255, 255, 0.1);' +
            ' color: #f00'
        );

        btn.onclick = (e) => {
            const ele = e.target;

            const deleteFile = ele.getAttribute('deleteFile');

            for(let i = 0; i < uploadFiles.length; i++) {
                
            }
        }

    }


  return (
    <Container maxWidth='md' style={{marginTop: '3%', textAlign: 'center'}}>
        <Grid container>
            <Grid item xs={12}>
                <Typography component='h1' variant='h5'>
                    게시글 등록
                </Typography>
            </Grid>
        </Grid>
        <form onSubmit={handlePost}>
            <Grid container style={{marginTop: '3%', textAlign: 'center'}}>
                <Grid item
                      xs={2}
                      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography component='p' variant='string'>
                            제목
                        </Typography>
                </Grid>
                <Grid item
                      xs={10}>
                    <TextField name='title'
                               id='title'
                               fullWidth
                               size='small'
                               required
                               placeholder='게시글 제목'></TextField>
                </Grid>
            </Grid>
            <Grid container style={{marginTop: '3%', textAlign: 'center'}}>
                <Grid item
                      xs={2}
                      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography component='p' variant='string'>
                            작성자
                        </Typography>
                </Grid>
                <Grid item
                      xs={10}>
                    <TextField name='nickname'
                               id='nickname'
                               fullWidth
                               size='small'
                               required
                               placeholder='게시글 작성자'
                               aria-readonly='true'
                               value={nickname}></TextField>
                </Grid>
            </Grid>
            <Grid container style={{marginTop: '3%', textAlign: 'center'}}>
                <Grid item
                      xs={2}
                      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography component='p' variant='string'>
                            내용
                        </Typography>
                </Grid>
                <Grid item
                      xs={10}>
                    <TextField name='content'
                               id='content'
                               fullWidth
                               size='small'
                               required
                               placeholder='게시글 내용'
                               multiline
                               rows={10}></TextField>
                </Grid>
            </Grid>
            <Grid container style={{marginTop: '3%', textAlign: 'center'}}>
                <Grid item
                      xs={2}
                      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography component='p' variant='string'>
                            파일첨부
                        </Typography>
                </Grid>
                <Grid item
                      xs={10}>
                    <Button type='button' variant='outlined' onClick={openFileInput}>파일 선택</Button>
                    <input type='file'
                           multiple
                           name='uploadFiles'
                           id='uploadFiles'
                           style={{display: 'none'}}
                           onChange={changeFiles}></input>
                </Grid>
            </Grid>
            <Grid container style={{marginTop: '3%', textAlign: 'center'}}>
                <Grid item
                      xs={2}
                      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Typography component='p' variant='string'>
                            미리보기
                        </Typography>
                </Grid>
                <Grid item
                      xs={10}>
                    <Container component='div' name='preview' id='preview'></Container>
                </Grid>
            </Grid>
            <Grid container style={{marginTop: '3%', textAlign: 'center'}}>
                <Grid item
                      xs={12}>
                        <Button type='submit' variant='contained'>등록</Button>
                </Grid>
            </Grid>
        </form>
    </Container>
  );
};

export default Post_Practice;