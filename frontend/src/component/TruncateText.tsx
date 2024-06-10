import parse from 'html-react-parser';
export  const truncate = (text: any) => {
    if (text.length > 147) {
      const truncatedTex = `${text.substring(0, 147)}...`;
      return parse(truncatedTex);
    }
    return parse(text);        
};