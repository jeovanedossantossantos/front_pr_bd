import styled from "styled-components";



export const Content = styled.div`
  background: linear-gradient(180deg, rgba(63, 250, 16, 0.74) 0%, 
  rgba(12, 89, 204, 0.52) 82.29%, 
  #000000 98.96%);
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const ContentFundo = styled.div`
  background: #FFFFFF;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 70px 20px;
  width: 120%;
  height: 150%;
  position: relative;
  margin-top: 10%;
`;

//inserir logo
interface ImageProps {
  url: string;

}
export const ContentImage = styled.div<ImageProps>`

  background: url(${({ url }: any) => url}) no-repeat 0;
  position: relative;
  width: 100%;
  height: 36px;
  display: block;
  margin: 0px auto;
`

export const ContentImageAtleta1 = styled.div<ImageProps>`
  position: absolute;
  background: url(${({ url }: any) => url}) no-repeat 0;
  filter: drop-shadow(0px 7px 12px rgba(0, 0, 0, 0.4));
  width: 30%;
  height: 80vh;
  left: 70%;
  top:20%;
`

export const ContentImageAtleta2 = styled.div<ImageProps>`
  position: absolute;
  background: url(${({ url }: any) => url}) no-repeat 0 0;
  width: 28%;
  height: 80vh;
  right: 70%;
  top:20%;
`