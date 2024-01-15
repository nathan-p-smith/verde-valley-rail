using System;
using System.Collections.Generic;

namespace VerdeValleyRail.Data.Entities
{
    public partial class Train
    {
        public Train()
        {
            TrainCars = new HashSet<TrainCar>();
        }

        public int TrainId { get; set; }
        public string Name { get; set; } = null!;
        public int EngineId { get; set; }

        public virtual Engine Engine { get; set; } = null!;
        public virtual ICollection<TrainCar> TrainCars { get; set; }
    }
}
