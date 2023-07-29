﻿using System;
using System.Collections.Generic;

namespace VerdeValleyRail.Data.Entities;

public partial class Engine
{
    public int EngineId { get; set; }

    public string Name { get; set; } = null!;

    public string ModelNumber { get; set; } = null!;

    public virtual ICollection<Train> Trains { get; set; } = new List<Train>();
}
