import useWindowSize from '../../hooks/useWindowSize'

const GeneralCard = ({ template }) => {
    const { width } = useWindowSize();

    return (
        <div className={width <= 425 || width <= 768 ? "col-12 sm:col-6 md:col-6 xl:col-4 p-2 border-round-3xl mb-2 bg-white md:max-w-19rem" : "bg-white mb-2 border-round-3xl"}>
            <div className="p-4">
                {template()}
            </div>
        </div>
    );
};

export default GeneralCard;
