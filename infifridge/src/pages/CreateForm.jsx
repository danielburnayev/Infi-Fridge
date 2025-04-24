import EditablePostIt from './EditablePostIt';
import './Pages.css';

function CreateForm(props) {
    return(
        <div className='form-background'>
            <h1 style={{position: 'fixed', 
                        margin: '0',
                        width: '28vw', 
                        left: 'calc(50% - 14vw)', 
                        top: 'calc(50% - 30vh - 43px)',
                        textAlign: 'center'}}>
                {props.formTitle}
            </h1>

            <EditablePostIt showOtherPages={props.showOtherPages} 
                            sortType={props.sortType} 
                            givenPostIt={props.givenPostIt}/>
        </div>
    );
}

export default CreateForm;