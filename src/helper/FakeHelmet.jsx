// Jai Shree Ram

import { useEffect } from 'react';

function FakeHelmet({ title }) {
    useEffect(() => {
        const prevTitle = document.title;
        document.title = title;
        return () => {
          document.title = prevTitle;
        };
      }, [title]);
    
      return null;
}

export default FakeHelmet