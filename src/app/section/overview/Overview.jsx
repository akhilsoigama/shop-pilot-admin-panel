// app/dashboard/page.tsx
"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  BarChart,
  LineChart,
  PieChart,
  Bar,
  Line,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react";

const salesData = [
  { name: "Jan", revenue: 4000, orders: 2400, returns: 240 },
  { name: "Feb", revenue: 3000, orders: 1398, returns: 221 },
  { name: "Mar", revenue: 2000, orders: 9800, returns: 229 },
  { name: "Apr", revenue: 2780, orders: 3908, returns: 200 },
  { name: "May", revenue: 1890, orders: 4800, returns: 218 },
  { name: "Jun", revenue: 2390, orders: 3800, returns: 250 },
  { name: "Jul", revenue: 3490, orders: 4300, returns: 210 },
];

const pieData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Home Goods", value: 200 },
  { name: "Beauty", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const topProducts = [
  { id: 1, name: "Wireless Headphones", sales: 1242, change: 12 },
  { id: 2, name: "Smart Watch", sales: 1042, change: 8 },
  { id: 3, name: "Running Shoes", sales: 892, change: -4 },
  { id: 4, name: "Bluetooth Speaker", sales: 742, change: 15 },
  { id: 5, name: "Yoga Mat", sales: 642, change: 22 },
];

export default function Overview() {
  return (
    <div className="p-6 space-y-6 bg-background text-foreground">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                Last 7 days <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-background border-border">
              <DropdownMenuItem className="hover:bg-accent focus:bg-accent">
                Today
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-accent focus:bg-accent">
                Last 7 days
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-accent focus:bg-accent">
                Last 30 days
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-accent focus:bg-accent">
                Last 90 days
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-accent focus:bg-accent">
                This year
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>Export</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-background border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <span className="text-muted-foreground">$</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,780</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500">12.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <span className="text-muted-foreground">📦</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUp className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500">8.3%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Order Value
            </CardTitle>
            <span className="text-muted-foreground">💰</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$89.34</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDown className="h-3 w-3 text-red-500 mr-1" />
              <span className="text-red-500">2.1%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-background border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Return Rate
            </CardTitle>
            <span className="text-muted-foreground">↩️</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowDown className="h-3 w-3 text-green-500 mr-1" />
              <span className="text-green-500">1.8%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4 bg-background border-border">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Revenue and orders from last 7 months</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesData}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="hsl(var(--border))"
                    opacity={0.3} 
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#3176d6"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#3176d6"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderColor: "dark:#fff",
                      borderRadius: "calc(var(--radius) - 2px)",
                      color: "hsl(var(--popover-foreground))",
                    }}
                  />
                  <Legend 
                    wrapperStyle={{
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Bar
                    dataKey="revenue"
                    fill="#8ccbed"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="orders"
                    fill="#e8716f"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 bg-background border-border">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>Distribution of sales across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "calc(var(--radius) - 2px)",
                      color: "hsl(var(--popover-foreground))",
                    }}
                  />
                  <Legend 
                    wrapperStyle={{
                      color: "hsl(var(--foreground))",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="md:col-span-4 bg-background border-border">
          <CardHeader>
            <CardTitle>Recent Sales Trend</CardTitle>
            <CardDescription>Daily revenue for the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData}>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    stroke="hsl(var(--border))"
                    opacity={0.3} 
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#f05469"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#f05469"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--popover))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "calc(var(--radius) - 2px)",
                      color: "hsl(var(--popover-foreground))",
                    }}
                  />
                  <Legend 
                    wrapperStyle={{
                      color: "hsl(var(--foreground))",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3176d6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 bg-background border-border">
          <CardHeader>
            <CardTitle>Top Products</CardTitle>
            <CardDescription>Best selling products this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center">
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-none">
                      {product.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {product.sales} sales
                    </p>
                  </div>
                  <div className="flex items-center">
                    {product.change > 0 ? (
                      <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                    )}
                    <span
                      className={
                        product.change > 0 ? "text-green-500" : "text-red-500"
                      }
                    >
                      {Math.abs(product.change)}%
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 ml-2"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}