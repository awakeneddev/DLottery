import { ethers } from "ethers";
import { Calendar, DollarSign, Loader, Plus, Ticket } from "lucide-react";
import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BlockChainContext } from "../../context/blockchainContext";
const CreateLottery = () => {
  const { contractSigner } = useContext(BlockChainContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ticketPrice: 0,
    totalPrize: 0,
    endTime: "",
    maxTicket: 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (contractSigner) {
      try {
        // converting prize amount into Wei (Since ethereum transaction use WEI);
        const prizeAmountWei = ethers.parseEther(String(formData.totalPrize));
        const ticketPriceWei = ethers.parseEther(String(formData.ticketPrice));
        const endTime = Math.floor(new Date(formData.endTime).getTime() / 1000);

        // calling create lottery function from that contract
        const tx = await contractSigner.createLottery(
          formData.name,
          formData.description,
          formData.maxTicket,
          ticketPriceWei,
          prizeAmountWei,
          endTime
        );
        toast.info("Lottery transaction is in progress.");
        // waiting for transaction to validate
        await tx.wait();

        toast.success("Lottery Created Successfully");
        navigate("/");
 
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/10 via-[#0f172a] to-[#0f172a]">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <NavLink to="/" className=" text-sky-400 underline">
            Go Back
          </NavLink>{" "}
          <div className="card-gradient mt-4 rounded-2xl border border-sky-400/10 p-8 glow backdrop-blur-xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 blur-xl bg-sky-400/20 rounded-full"></div>
                <Plus className="w-8 h-8 text-sky-400 relative" />
              </div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">
                Create New Lottery
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 mb-2">
                    Lottery Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-sky-400/10 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-sky-400/50 transition-colors"
                    placeholder="Enter lottery name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-300 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full bg-gray-800/50 border border-sky-400/10 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-sky-400/50 transition-colors"
                    placeholder="Enter lottery description"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-300 mb-2">
                      <DollarSign className="w-4 h-4 inline-block mr-2 text-sky-400" />
                      Ticket Price (ETH)
                    </label>
                    <input
                      type="number"
                      name="ticketPrice"
                      value={formData.ticketPrice}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      className="w-full bg-gray-800/50 border border-sky-400/10 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-sky-400/50 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">
                      <Ticket className="w-4 h-4 inline-block mr-2 text-sky-400" />
                      Max Ticket
                    </label>
                    <input
                      type="number"
                      name="maxTicket"
                      value={formData.maxTicket}
                      onChange={handleChange}
                      min="1"
                      className="w-full bg-gray-800/50 border border-sky-400/10 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-sky-400/50 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">
                      <Calendar className="w-4 h-4 inline-block mr-2 text-sky-400" />
                      endTime
                    </label>
                    <input
                      type="datetime-local"
                      name="endTime"
                      value={formData.registrationOpenDate}
                      onChange={handleChange}
                      className="w-full bg-gray-800/50 border border-sky-400/10 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-sky-400/50 transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-sky-400 to-emerald-400 text-gray-900 font-medium py-3 px-4 rounded-lg hover:shadow-lg hover:shadow-sky-400/20 transition-all duration-300"
              >
                {isLoading ? (
                  <Loader className="w-4 h-4 inline-block mr-2 text-gray-800/50" />
                ) : (
                  "Create Lottery"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateLottery;
