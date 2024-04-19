interface StepperList {
  id: number;
  name: string;
  isDone: boolean;
}

interface Props {
  list: StepperList[];
}

const Stepper = ({ list }: Props) => {
  const current = list.find((a) => a.isDone === false)?.id;
  // console.log("stepper list: ", list);

  return (
    <section className="flex justify-center items-start sm:items-center">
      <ol className="flex flex-col justify-center items-start w-full text-sm font-medium text-center max-w-[900px] gap-4 sm:flex-row sm:items-center sm:gap-0">
        {list.map((step) => (
          <div key={step.id} className="flex">
            <li
              className={`flex md:w-full justify-center items-start sm:items-center hover:cursor-default px-4
              ${step.isDone ? "text-[#FF2D2F]" : "text-[#8C94A1]"}
              ${
                step.id === current
                  ? "text-[#B0B6BF] font-bold"
                  : "text-[#8C94A1]"
              }    
              `}
            >
              <span
                className={`flex justify-start sm:justify-center items-center gap-2 sm:gap-0`}
              >
                <span
                  className={`flex items-center justify-center w-8 h-8 border
                    ${
                      step.isDone
                        ? "border-[#FF2D2F] bg-[#FF2D2F] text-[#fcfcfc]"
                        : "border-[#8C94A1]"
                    } 
                    rounded-full shrink-0 m-0 sm:me-2.5`}
                >
                  {step.isDone ? "✔" : step.id}
                </span>
                <span className="flex flex-nowrap text-nowrap pt-1 sm:pt-0">
                  {step.name}
                </span>
                {/* {step.id === current && (
                  <span className="w-2 h-2 bg-[#FF2D2F] rounded-full" />
                )} */}
              </span>
            </li>
            {step.id !== list.length && (
              <div className="hidden justify-center items-center w-full py-2 sm:flex sm:py-0">
                <hr className="w-[1vh] border-t-0 border-[#8C94A1] h-4 border-l sm:h-0 sm:border-t sm:w-[2vh] md:w-[5vh]" />
              </div>
            )}
          </div>
        ))}
      </ol>
    </section>
  );
};

export default Stepper;
