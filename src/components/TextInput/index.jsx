import './styles.css'; // Componente da barra de pesquisa para buscar pelas palavras digitadas.
                                                        // Usar esse método deixa o código mais fácil de fazer manutenções
export const TextInput = ({ actionFn, inputValue}) => { // Importando dados da home e usando em um componente separado.
    return (
        <input
        className="text-input" 
        type="text"
        onChange={actionFn}
        value={inputValue}
        />  
    );
}
