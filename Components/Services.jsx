import Image from "next/image";

// -- Internal imports --------------------------------
import images from "../Images/index";

const Services = ({
  setOpenProfile,
  setCompleteModel,
  setGetModel,
  setStartModel,
}) => {
  // for simplicity of code we are storing the data in the array and object, then iterate it in JSX
  const team = [
    { avatar: images.compShipment },
    { avatar: images.getShipment },
    { avatar: images.startShipment },
    { avatar: images.userProfile },
    { avatar: images.shipCount },
    { avatar: images.send },
  ];

  const openModelBox = (text) => {
    if (text === 1) {
      setCompleteModel(true);
    } else if (text === 2) {
      setGetModel(true);
    } else if (text === 3) {
      setStartModel(true);
    } else if (text === 4) {
      setOpenProfile(true);
    }
  };
  return (
    <section className="py-0 pb-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <div className="mt-12">
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {team.map((item, i) => (
              <li key={i}>
                <div
                  onClick={() => openModelBox(i + 1)}
                  className="w-full h-60 sm:h-52 md:h-56"
                >
                  <Image
                    src={item.avatar}
                    alt=""
                    className="w-full h-full object-cover object-center shadow-md rounded-xl"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Services;
