declare module 'react-native-collapsible' {
  import { ReactElement, ReactNode } from 'react';

  export interface CollapsibleProps {
    renderHeader: (content: any, index: number, isActive: boolean, sections: any[]) => ReactElement<any>;
    renderContent: (content: any, index: number, isActive: boolean, sections: any[]) => ReactElement<any>;
    sections: any[];
    activeSections: number[];
    onChange: (activeSections: number[]) => void;
    [key: string]: any;
  }

  export const Accordion: React.FC<CollapsibleProps>;
  export default Accordion;
}