import styled from "styled-components";

export const WrapperRecordView = styled.div`
    height: 70vh;
    margin: 0 5% 0 5%; 
    
    
    

`;
export const WrapperRecordMenue = styled.div`
    margin: 2vh 5% 2vh 5%;
    
    
    

`;
export const DashboardWrapper = styled.div`
    height:100%;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: 33vh 33vh;
    
    grid-column-gap: 1em;
    grid-row-gap: 2vh;
    

`;
export const WidgetWrapper = styled.div`
     border: ${props => props.dashboardEditingActive ? "2px" : "0px"} dotted ${props => props.color};
     grid-row-start:${props => props.positionInfo.y};
     grid-row-end: span 1;
     grid-column-start:${props => props.positionInfo.x};
     grid-column-end: span 1;
     position:relative;
     cursor: ${props => props.dashboardEditingActive ? "move" : "default"} ;
             z-index: 100;

     
`;
export const H2WithOutMargin = styled.h2`         
   margin:0;
     
`;
export const TealName = styled.span`         
   color:#1CA6A6;  
   font-weight:bold;   
`;
export const TealRight = styled.p`         
   color:#1CA6A6;  
   text-align:right;  
   margin:0;
`;

export const PreferredBreakSpan = styled.span`         
   display:inline-block;   
`;
export const IndicatorElement = styled.div` 
width:50%;
padding:0.5em;        
`
export const FlexRow = styled.div` 
   
  display: flex;
  flex-wrap:wrap;
`
export const ButtonCircle = styled.div`

  float: right;

`
export const Centering = styled.div`
    position:absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
        z-index: 1000;

`
export const FoggyDiv = styled.div`
position:absolute;
    height: 100%;
  width: 100%;
  top:0px;
  left:0px;
    ${props => props.edit ? "filter:blur(2px)" : ""};

  
`
export const ThirdDiv = styled.div`
width:30vw;
  
`
/*export const HalfWidth = styled.div`
  min-width:120;

  
`*/


export const Row = styled.div`
    display: flex;
`;

export const ExportViewColumn = styled.div`
    flex: 50%;
`;

export const Column = styled.div`
width:48%;
margin: 0 2%;
  
`
export const TwoColumnGrid = styled.div`
    display: grid;
    grid-template-columns: 49% 49%;
    
    grid-column-gap: 5%;
    grid-row-gap: 5%;   

`;
export const GridElement = styled.div`
    grid-row-start:${props => props.row};
     grid-row-end: span ${props => props.rowSpan != null ? props.rowSpan : "1"};
     grid-column-start:${props => props.col};
     grid-column-end: span ${props => props.colSpan != null ? props.colSpan : "1"};

`;