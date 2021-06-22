import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { GetStaticProps } from 'next';
import { FaqModel } from '../../api/Faq';
import { openDB } from '../openDB';

interface FaqProps {
    faq: FaqModel[];
}

export default function Faq({ faq }: FaqProps) {
    return (
        <div>
            {faq.map((f) => (
                <ExpansionPanel key={f.id}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography color={"primary"} variant="h5">
                            {f.question}
                        </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography color={"secondary"}>
                            {f.answer}
                        </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))}
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const db = await openDB();
    const faq = await db.all('SELECT * FROM FAQ ORDER BY createDate DESC');
    return { props: { faq } };
};