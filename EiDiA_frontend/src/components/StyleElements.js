import styled from "styled-components";

export const WrapperRecordView = styled.div`
    height: 70vh;
    margin: 0 5% 0 5%; 
    
    
    

`;
export const DashboardWrapper = styled.div`
    height:100%;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    grid-template-rows: auto auto;
    grid-column-gap: 1em;
    grid-row-gap: 1em;
    

`;
export const WidgetWrapper = styled.div`
         
     border: 2px dotted ${props => props.color};
     grid-row-start:${props => props.positionInfo.y};
     grid-row-end:${props => (props.positionInfo.rows + props.positionInfo.y)};
     grid-column-start:${props => props.positionInfo.x};
     grid-column-end:${props => (props.positionInfo.cols + props.positionInfo.x)};
     padding: 1em;
     
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
`;

export const PreferredBreakSpan = styled.span`         
   display:inline-block;   
`;
export const IndicatorElement = styled.div` 
width:${props => props.elementPercentage + "%"};
padding:1em;        
`
export const FlexRow = styled.div` 
   
  display: flex;
  flex-wrap:wrap;
`