using System;
using System.Collections.Generic;

namespace VerdeValleyRail.Data.Entities
{
    public partial class TrainCar
    {
        public int TrainCarId { get; set; }
        public int TrainId { get; set; }
        public int CarId { get; set; }

        public virtual Car Car { get; set; } = null!;
        public virtual Train Train { get; set; } = null!;
    }
}
